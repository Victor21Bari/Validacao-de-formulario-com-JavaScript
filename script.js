let bariValidator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        bariValidator.clearError();

        for (i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = bariValidator.checkInput(input);
            if (check !== true) {
                send = false;
                //exibir erro
                bariValidator.showErro(input, check);
            }

        }

    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');

                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo não pode ser vazio';
                        }
                       break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que ter pelo menos'+rDetails[1] +'caracteres';
                        }
                    break; 

                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'E-mail digitado não é valido'
                            }
                        }
                    break;
                }
            }
        }

        return true
    },

    showErro: (input, erro) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = erro;

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    },

    clearError: () => {

        let inputs = form.querySelectorAll('input');
        for(let i=0; i <inputs.length;i++){
            inputs[i].style = '';
        }
        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i< errorElements.length;i++){
            errorElements[i].remove();
        }
    },

    if(send) {
        form.submit();
    }

};

let form = document.querySelector('.bariValidator');
form.addEventListener('submit', bariValidator.handleSubmit);
