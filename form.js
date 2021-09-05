
$(function()
{
    function after_form_submitted(data) 
    {
        if(data.result == 'success')
        {
            $('.form_inner').val('');

            document.querySelectorAll('.button2').forEach(button => {
                let getVar = variable => getComputedStyle(button).getPropertyValue(variable);
                if(!button.classList.contains('active')) {

                    button.classList.add('active');

                    gsap.to(button, {
                        keyframes: [{
                            '--border-radius': 1000,
                            '--border': 2,
                            '--left-wing-first-x': 50,
                            '--left-wing-first-y': 100,
                            '--right-wing-second-x': 50,
                            '--right-wing-second-y': 100,
                            duration: .2,
                            onComplete() {
                                gsap.set(button, {
                                    '--border': 0,
                                    '--left-wing-first-y': 0,
                                    '--left-wing-second-x': 40,
                                    '--left-wing-second-y': 100,
                                    '--left-wing-third-x': 0,
                                    '--left-wing-third-y': 100,
                                    '--left-body-third-x': 40,
                                    '--right-wing-first-x': 50,
                                    '--right-wing-first-y': 0,
                                    '--right-wing-second-x': 60,
                                    '--right-wing-second-y': 100,
                                    '--right-wing-third-x': 100,
                                    '--right-wing-third-y': 100,
                                    '--right-body-third-x': 60
                                })
                            }
                        }, {
                            '--left-wing-third-x': 20,
                            
                            '--right-wing-third-y': 90,
                            '--right-body-third-y': 90,
                            '--right-wing-second-y': 90,
                            '--left-wing-third-y': 90,
                            '--left-wing-second-y': 90,
                            '--left-body-third-y': 90,
                            '--right-wing-third-x': 80,
                            duration: .2
                        }, {
                            '--rotate': 10,
                            '--left-wing-third-y': 95,
                            '--left-wing-third-x': 27,
                            '--right-body-third-x': 45,
                            '--right-wing-second-x': 45,
                            '--right-wing-third-x': 60,
                            '--right-wing-third-y': 83,
                            duration: .25
                        }, {
                            '--rotate': -55,
                            '--plane-x': -8,
                            '--plane-y': 24,
                            duration: .2
                        }, {
                            '--rotate': 65,
                            '--plane-x': 45,
                            '--plane-y': -180,
                            duration: .5
                        }, {
                            '--rotate': 65,
                            '--plane-x': 90,
                            '--plane-y': -360,
                            '--plane-opacity': 0,
                            duration: .5,
                            onComplete() {
                                setTimeout(() => {
                                    button.removeAttribute('style');
                                    gsap.fromTo(button, {
                                        opacity: 0,
                                        y: -8
                                    }, {
                                        opacity: 1,
                                        y: 0,
                                        clearProps: true,
                                        duration: .3,
                                        onComplete() {
                                            button.classList.remove('active');
                                        }
                                    })
                                }, 2000)
                            }
                        }]
                    })

                    gsap.to(button, {
                        keyframes: [{
                            '--text-opacity': 0,
                            '--border-radius': 1000,
                            '--left-wing-background': getVar('--primary-darkest'),
                            '--right-wing-background': getVar('--primary-darkest'),
                            duration: .1
                        }, {
                            '--left-wing-background': getVar('--primary'),
                            '--right-wing-background': getVar('--primary'),
                            duration: .1
                        }, {
                            '--left-body-background': getVar('--primary-dark'),
                            '--right-body-background': getVar('--primary-darkest'),
                            duration: .4
                        }, {
                            '--success-opacity': 1,
                            '--success-scale': 1,
                            duration: .25,
                            delay: .25
                        }]
                    })

                }
            });


            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }

    $('#contactForm').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            // $btn.text('Send Message');
        });
        

                    $.ajax({
                type: "POST",
                url: 'handler.php',
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json' 
            });        
        
      });   
});
