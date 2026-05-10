import React, { useEffect, useState } from "react";
import { Button, Divider, Flex, Text, hubspot } from "@hubspot/ui-extensions";
import { CrmPropertyList } from "@hubspot/ui-extensions/crm";

hubspot.extend(({ context, runServerlessFunction }) => (
  <ContactHealthCard context={context} runServerlessFunction={runServerlessFunction} />
));

function ContactHealthCard({ context, runServerlessFunction }) {
  const contactId = context?.crm?.objectId ? String(context.crm.objectId) : "";
  const [state, setState] = useState({
    loading: false,
    error: "",
    data: null
  });

  useEffect(() => {
    if (contactId) {
      loadHealth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId]);

  async function loadHealth() {
    if (!contactId) {
      setState({ loading: false, error: "Contact ID is unavailable.", data: null });
      return;
    }

    setState({ loading: true, error: "", data: null });

    try {
      const response = await runServerlessFunction({
        name: "contact-health",
        parameters: {
          contactId
        }
      });

      if (response.status === "ERROR") {
        throw new Error(response.message || "Serverless function failed.");
      }

      setState({ loading: false, error: "", data: response.response || null });
    } catch (error) {
      setState({
        loading: false,
        error: error?.message || "Unable to load contact health.",
        data: null
      });
    }
  }

  if (!contactId) {
    return (
      <Flex direction="column" gap="small">
        <Text>Contact Health</Text>
        <Text>This card needs a contact record context.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="medium">
      <Text>Contact Health</Text>

      <CrmPropertyList
        properties={["email", "jobtitle", "company", "lifecyclestage"]}
        direction="row"
      />

      <Button onClick={loadHealth}>{state.loading ? "Refreshing..." : "Refresh"}</Button>

      {state.loading ? <Text>Loading contact health...</Text> : null}
      {state.error ? <Text>Error: {state.error}</Text> : null}

      {state.data ? (
        <Flex direction="column" gap="small">
          <Divider />
          <Text>Status: {state.data.status}</Text>
          <Text>Reason: {state.data.reason}</Text>
          <Text>Suggested next step: {state.data.nextStep}</Text>
        </Flex>
      ) : null}
    </Flex>
  );
}

