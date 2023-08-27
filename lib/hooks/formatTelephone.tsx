export const formatTelephone = (phoneNumber: string) => {
    // Remove all non-digit characters from the input
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Ensure the cleaned phone number has exactly 10 digits
    if (cleanedPhoneNumber.length !== 10) {
      return 'Invalid phone number';
    }
  
    // Format the cleaned phone number as (XXX) XXX-XXXX
    const formattedPhoneNumber = `(${cleanedPhoneNumber.slice(0, 3)}) ${cleanedPhoneNumber.slice(3, 6)}-${cleanedPhoneNumber.slice(6)}`;
  
    return formattedPhoneNumber;
  };
  
  // Example usage
  const inputPhoneNumber = '123-456-7890';
  const formattedPhoneNumber = formatTelephone(inputPhoneNumber);
  
  console.log(formattedPhoneNumber); // Output: (123) 456-7890
  