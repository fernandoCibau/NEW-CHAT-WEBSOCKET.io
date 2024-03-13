
const socket = io();

let user;
//-----------------------sweetalertw--------------------------------
Swal.fire(
    {
        title: 'Welcome!',
        text: 'insert your name',
        input: "text",
        inputValidator : ( value ) => {
            if ( !value || value.length <= 3 ){
                return "You can't move forward without identification"
            }
        },
        allowOutsideClick : false,
        confirmButtonText: 'Starts'
    }
).then( result => {
    // console.log( result );
    user =  result.value;
    socket.emit( "identification",  user );
});
//-----------------------------------------------------------------------------
socket.on( "welcome", data => {
    if( user ){
        Swal.fire({
            position: "top-end",
            icon: "success",
            toast: true,
            title: `${ data } Connected `,
            showConfirmButton: false,
            timer: 3500
        });
    }
})
//-----------------------------------------------------------------------------
socket.on( "allMessage", data => {
    const messageHtml =  document.getElementById( "allMessage" );
    let message = "" ;

    if( !data.length && user ) {
            message = "<h4>Se el primero en escribir un mensaje</h4>"
    }else if ( user ){
        data.forEach( e => {
            message += `
                <p>Name : <strong> ${ e.user } </strong>
                    Dice :<strong> <em> ${ e.message } </em></strong> </p>
            `
        });
    }
    messageHtml.innerHTML = message;
    
});
//-----------------------------------------------------------------------------
const form_message =    document.getElementById( "form" )

form_message.addEventListener( "submit", ( e )=> {
    e.preventDefault();
    if( user ){
        socket.emit( "form_message", { "user" : user, "message" : form_message[0].value }  );
    }
});
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

