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
    
    $('#modal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget);
      var recipient = button.data('info');
      var modal = $(this).find('.modal-body');
      modal.text('');
      var cotent = $('<p>');
      content.text(recipient);
      content.appendTo(modal);
    });

    $.material.init();
});