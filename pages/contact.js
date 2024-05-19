const ContactForm=document.getElementById('contact');
const ContacMessage=document.getElementById('contact-message');

ContactForm.addEventListener('submit',async(event)=> {
   
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lasetName=document.getElementById('lastName').value;
    const Number=document.getElementById('number').value;
    const Email=document.getElementById('email').value;
    const message=document.getElementById('message').value;

    const newMessage={
        id : Math.floor(Math.random() * 1000) + 2,
        firstName,
        lasetName,
        Number,
        Email,
        message
    };

    try{
        const response = await fetch('http://localhost:4202/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
        });
        if( !response.ok)
            {
                throw new Error( `Error adding message, ${response.status}`);
            }
            ContacMessage.textContent='sended successfly!!';
            ContactForm.reset(); 
    }catch(error)
    {
        console.error('Error:', error);
        ContacMessage.textContent=' sending failed. Please try again ';
    }

});