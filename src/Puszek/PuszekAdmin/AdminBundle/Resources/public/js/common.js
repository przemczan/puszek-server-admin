$(function() {
    $('[data-confirm]').click(function() {
        var $element = $(this),
            $modal = $('#modal');
        $modal.modal('show');
        $('.modal-title', $modal).html('Confirmation');
        $('.modal-body', $modal).html($element.data('confirm'));
        $('.btn-primary', $modal).one('click', function() {
            $('.modal-body', $modal).html('Processing...');
            document.location.href = $element.data('url');
        });
    });
});