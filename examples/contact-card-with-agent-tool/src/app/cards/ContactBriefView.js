import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Flex, Text, hubspot } from "@hubspot/ui-extensions";

const h = React.createElement;

// Plain JavaScript React keeps this view directly testable with the SDK renderer.
export function ContactBriefCard({ context, endpoint = "https://your-host.example.com/api/contact-brief" }) {
  const contactId = context?.crm?.objectId ? String(context.crm.objectId) : "";
  const needsSetup = !contactId || endpoint.includes("your-host.example.com");
  const [state, setState] = useState({ status: "idle", data: null });
  const sequence = useRef(0);
  useEffect(() => {
    if (!needsSetup) loadBrief();
    return () => { sequence.current += 1; };
  }, [contactId, endpoint]);
  async function loadBrief() {
    if (needsSetup) return;
    const current = ++sequence.current;
    setState({ status: "loading", data: null });
    try {
      const response = await hubspot.fetch(endpoint, {
        method: "POST", timeout: 12000, body: { inputFields: { contactId } }
      });
      if (!response.ok) throw new Error("Backend unavailable");
      const payload = await response.json();
      if (payload.hs_execution_state !== "SUCCESS" || !payload.outputFields) throw new Error("Invalid response");
      const data = payload.outputFields;
      if (typeof data.brief !== "string" || typeof data.nextStep !== "string" || typeof data.status !== "string") throw new Error("Invalid fields");
      if (sequence.current === current) setState({ status: data.status === "empty" ? "empty" : "success", data });
    } catch {
      if (sequence.current === current) setState({ status: "error", data: null });
    }
  }
  return h(Flex, { direction: "column", gap: "medium" },
    h(Text, null, "Contact Brief"),
    h(Button, { onClick: loadBrief, disabled: needsSetup || state.status === "loading" }, "Refresh"),
    needsSetup ? h(Text, null, "Setup required") : null,
    state.status === "loading" ? h(Text, null, "Loading brief...") : null,
    state.status === "error" ? h(Text, null, "Unable to load this contact. Try again or contact your app administrator.") : null,
    state.status === "empty" ? h(Text, null, "No contact data available.") : null,
    state.status === "success" ? h(Flex, { direction: "column", gap: "small" },
      h(Divider), h(Text, null, state.data.brief),
      h(Text, null, "Next step: " + state.data.nextStep),
      h(Text, null, "Status: " + state.data.status)) : null);
}
