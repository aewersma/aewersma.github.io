document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
  
    const validators = {
      name: (value) => value.trim() !== '' || 'Name is required.',
      email: (value) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value) || 'Please enter a valid email address.';
      },
      discord: (value) => {
        if (!value) return true; 
        const re = /^@[A-Za-z0-9_]{2,32}$/;
        return re.test(value) || 'Discord should be in the form @username (2–32 letters, numbers, or underscores).';
      },
      message: (value) => value.trim() !== '' || 'Message cannot be empty.'
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
  
      Object.keys(validators).forEach((field) => {
        document.getElementById(field + 'Error').textContent = '';
      });
      status.textContent = '';
  
      Object.entries(validators).forEach(([field, check]) => {
        const input = form[field];
        const result = check(input.value);
        if (result !== true) {
          valid = false;
          document.getElementById(field + 'Error').textContent = result;
        }
      });
  
      if (!valid) return;
  
      const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        discord: form.discord.value.trim(),
        message: form.message.value.trim()
      };
      console.log('Submitting contact form:', formData);
  
      status.textContent = 'Thanks for reaching out! We’ll get back to you soon.';
      form.reset();
    });
  });
  