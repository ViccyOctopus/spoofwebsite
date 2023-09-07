$(document).ready(function(){
  
    $(document).on('click','.button--share_icon',function(e) {
        e.preventDefault();
        shareService = $(this).data('service');
        shareUrl = $(this).parent().data('sharelink');
        if ( shareService == 'menu' ) {
            addThisEndPoint = 'http://api.addthis.com/oexchange/0.8/offer?url=' + shareUrl;
        } else {
            addThisEndPoint = 'http://api.addthis.com/oexchange/0.8/forward/' + shareService + '/offer?url=' + shareUrl + '&pubid=ra-5b3e7a3c8c37dc70';
        }
        window.open(addThisEndPoint,'_blank','');
    });



});