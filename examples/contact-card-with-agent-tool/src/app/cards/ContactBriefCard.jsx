import React from "react";
import { hubspot } from "@hubspot/ui-extensions";
import { ContactBriefCard } from "./ContactBriefView.js";

// Public endpoint only. Never put a shared secret or API token in this file.
const endpoint = "https://your-host.example.com/api/contact-brief";
hubspot.extend(({ context }) => React.createElement(ContactBriefCard, { context, endpoint }));

