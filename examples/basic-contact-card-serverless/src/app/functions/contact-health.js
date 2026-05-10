exports.main = async (context = {}) => {
  const contactId = String(context.parameters?.contactId || '').trim();

  if (!contactId) {
    return {
      status: 'No data',
      reason: 'The card did not receive a contact ID.',
      nextStep: 'Open this card from a HubSpot contact record.'
    };
  }

  return {
    status: 'Sample warm lead',
    reason: `Mock serverless response for contact ${contactId}. Replace with safe CRM or external API lookup when ready.`,
    nextStep: 'Review recent activity and send a personalized follow-up.'
  };
};

