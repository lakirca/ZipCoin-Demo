var rotation = 0;

jQuery.fn.rotate = function(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$(document).on("click", "#dropdown-button", function() {
    $(this).parent().siblings().each(function(index,element){
       old = $(element).find(".menu_sub_item:visible")
       $(old).slideToggle();
       oldArrow = $(old.parentNode).find('.parrent_arrow')
       console.log(oldArrow)
       $(oldArrow).rotate(rotation);

    });
	parent = $(this.parentNode).find('.menu_sub_item')
	arrow = $(this.parentNode).find('.parrent_arrow')
    $(parent).slideToggle();
    rotation += 180;
    $(arrow).rotate(rotation);
});
