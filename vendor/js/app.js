$(document).ready(function() {
                    
    var danger = $('#danger'),
    safe = $('#safe'),
    audio = $('audio'),
    socket = io.connect(window.location.host);

    danger.hide();
    
    socket.on('alert', function(){
        safe.hide();
        danger.show();
        audio[0].play();
        document.title = 'WARNING | Raise  alarm';
    });
    
    danger.click(function() {
       danger.hide();
       safe.show();
       audio[0].pause();
       document.title = 'Raise  alarm';
    });
    
    $('#send').click(function() {
       socket.emit('send');
    });
    
    $.material.init();
});