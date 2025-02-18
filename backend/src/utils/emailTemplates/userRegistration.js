export const welcomeTemplate = (userData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>Hello ${userData.name}!</h1>
    <p>Welcome to the ICMMSC 2025!</p>
    <p>We'd love to have you join us!</p>
    <br/>
    <p>Best regards,</p>
    <p>ICMMSC Team</p>
  </div>
`;

export const adminNotificationTemplate = (userData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>${userData.name} Registered for the Conference!</h1>
    <p>Registration Details:</p>
    <ul>
      <li>Name: ${userData.name}</li>
      <li>Email: ${userData.email}</li>
      <li>Phone: ${userData.phone}</li>
    </ul>
    <br/>
    <p>Best regards,</p>
    <p>ICMMSC Team</p>
  </div>
`;