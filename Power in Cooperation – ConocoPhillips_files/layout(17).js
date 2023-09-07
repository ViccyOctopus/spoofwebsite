$(document).ready(function(){
	
	var yetVisited = localStorage['visited'];
	
    if ( !yetVisited ) {
        // open flyout
        localStorage['visited'] = "yes";
		
		$('.ddc_flyout_container').css('right','0');
	
		$('.ddc_flyout').click(function () {
			
			if ( $(this).hasClass('closed') ) {
				$('.ddc_flyout_container').css('right','-340px');
				$(this).removeClass('closed');
			} else {
				$('.ddc_flyout_container').css('right','0');
				$(this).addClass('closed');
			}
			
		});
		
    } else {
	
	
		$('.ddc_flyout').click(function () {
			
			if ( $(this).hasClass('closed') ) {
				$('.ddc_flyout_container').css('right','0');
				$(this).removeClass('closed');
			} else {
				$('.ddc_flyout_container').css('right','-340px');
				$(this).addClass('closed');
			}
			
		});
	
	}
	
	
	
	
});