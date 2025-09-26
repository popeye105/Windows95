import React, { useState, useEffect } from 'react';

const MailWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setSubmitStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setSubmitStatus('Name and Email required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('Sending message...');

    try {
      const response = await fetch('https://formspree.io/f/mjkabyqe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message || 'No message provided',
          _replyto: formData.email,
          _subject: `New message from ${formData.name} - Windows 95 Portfolio`
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        setSubmitStatus('Message sent successfully ✓');
        setTimeout(() => {
          handleClear();
        }, 2000);
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        
        if (response.status === 422) {
          setSubmitStatus('Form validation failed. Please check your inputs.');
        } else if (response.status === 403) {
          setSubmitStatus('Form not properly configured. Contact administrator.');
        } else if (response.status === 429) {
          setSubmitStatus('Too many requests. Please wait and try again.');
        } else {
          setSubmitStatus(`Server error (${response.status}). Please try again later.`);
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setSubmitStatus('Network error. Please check your internet connection.');
      } else if (error.name === 'AbortError') {
        setSubmitStatus('Request timed out. Please try again.');
      } else {
        setSubmitStatus('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-win95-gray">
      <div className={`${isMobile ? 'px-2 pt-1 pb-0' : 'px-4 pt-1 pb-0'}`}>
        <p className="text-sm text-black text-center">
          Feel free to reach out or just to say hello.
        </p>
      </div>
      <div className={`flex-1 flex flex-col ${isMobile ? 'px-2 pb-2' : 'px-4 pb-4'}`}>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className={`flex-1 ${isMobile ? 'space-y-1' : 'space-y-2'} ${isMobile ? 'pb-2' : ''} border border-gray-400 p-2 m-2`}>
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-2 border border-gray-400 bg-white text-black text-sm`}
                style={{ height: '24px' }}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-2 border border-gray-400 bg-white text-black text-sm`}
                style={{ height: '24px' }}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-2 border border-gray-400 bg-white text-black text-sm`}
                style={{ height: '24px' }}
              />
            </div>

            <div className="flex-1 flex flex-col" style={{ minHeight: isMobile ? '60px' : '80px' }}>
              <label className="block text-sm font-bold mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full flex-1 px-2 border border-gray-400 bg-white text-black resize-none text-sm`}
                style={{ minHeight: isMobile ? '40px' : '60px' }}
              />
            </div>
          </div>

          <div className={`flex gap-2 justify-center ${isMobile ? 'mt-1' : 'mt-2'} flex-shrink-0 ${isMobile ? 'pb-2' : ''}`} style={isMobile ? { marginBottom: '20px' } : {}}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`win95-button ${isMobile ? 'px-3 py-1' : 'px-4 py-1'} font-bold text-xs disabled:opacity-50`}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={`win95-button ${isMobile ? 'px-3 py-1' : 'px-4 py-1'} font-bold text-xs`}
            >
              Clear
            </button>
          </div>

          {submitStatus && submitStatus.includes('required') && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-win95-gray border-2 border-outset p-4 shadow-lg max-w-xs w-full mx-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-red-600 mb-2">⚠️ Error</div>
                  <div className="text-sm mb-3">{submitStatus}</div>
                  <button
                    onClick={() => setSubmitStatus('')}
                    className="win95-button px-4 py-1 text-sm"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {submitStatus && !submitStatus.includes('required') && (
            <div className={`text-center text-xs mt-1 p-1 flex-shrink-0 ${
              submitStatus.includes('successfully') 
                ? 'text-green-600' 
                : submitStatus.includes('Failed')
                ? 'text-red-600'
                : 'text-blue-600'
            }`}>
              {submitStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MailWindow;
