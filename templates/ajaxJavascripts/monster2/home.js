$(function(){
    $("#Submit").click(function(e){
        e.preventDefault();
        let lastName = $('#last-name').val();
        let firstName = $('#first-name').val();
        console.log(firstName,lastName);
        $.post({
            url:    'http://localhost:6500/update',
            dataType:   'JSON',
            data:   {
                firstName:  firstName,
                lastName:   lastName
            },
            success:function(data,status){
                console.warn('response: ',data);
            }
        });
    });
});