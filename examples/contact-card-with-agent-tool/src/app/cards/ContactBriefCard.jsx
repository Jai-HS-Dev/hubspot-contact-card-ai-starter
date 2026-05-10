import React, { useEffect, useState } from "react";
import { Button, Divider, Flex, Text, hubspot } from "@hubspot/ui-extensions";

const CONTACT_BRIEF_URL = "https://your-host.example.com/api/contact-brief";

hubspot.extend(({ context }) => <ContactBriefCard context={context} />);

function ContactBriefCard({ context }) {
  const contactId = context?.crm?.objectId ? String(context.crm.objectId) : "";
  const [state, setState] = useState({
    loading: false,
    error: "",
    outputFields: null
  });

  useEffect(() => {
    if (contactId) {
      loadBrief();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId]);

  async function loadBrief() {
    setState({ loading: true, error: "", outputFields: null });

    try {
      const response = await hubspot.fetch(CONTACT_BRIEF_URL, {
        method: "POST",
        timeout: 12000,
        body: {
          inputFields: {
            contactId
          }
        }
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setState({
        loading: false,
        error: "",
        outputFields: payload.outputFields || {}
      });
    } catch (error) {
      setState({
        loading: false,
        error: error?.message || "Unable to load contact brief.",
        outputFields: null
      });
    }
  }

  return (
    <Flex direction="column" gap="medium">
      <Text>Contact Brief</Text>
      <Button onClick={loadBrief}>{state.loading ? "Refreshing..." : "Refresh"}</Button>

      {state.loading ? <Text>Loading brief...</Text> : null}
      {state.error ? <Text>Error: {state.error}</Text> : null}

      {state.outputFields ? (
        <Flex direction="column" gap="small">
          <Divider />
          <Text>{state.outputFields.brief || "No brief returned."}</Text>
          <Text>Next step: {state.outputFields.nextStep || "Not available"}</Text>
          <Text>Status: {state.outputFields.status || "unknown"}</Text>
        </Flex>
      ) : null}
    </Flex>
  );
}

