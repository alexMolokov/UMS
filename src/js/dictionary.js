const dictionary = {
    en: {
        messages: {
            required: () => 'Is required',
            email: () => 'Not valid email',
            url: () => 'Not valid url',
            decimal: () => 'Not valid',
            numeric: () => 'Not valid',
            min_value: () => 'Not valid',
            min: () => 'Not valid',
            password:  () => 'Not valid',
            login: () => 'Not valid',
            is: () => 'Not valid',
            regex: () => 'Not valid',
            alpha_num:  () => 'Only letters or digits'
        }
    },
    ru: {
        messages: {
            required: () => 'Обязательное поле',
            email: () => 'Некорректный адрес',
            decimal: () => 'Некорректное значение',
            numeric: () => 'Некорректное значение',
            min_value: () => 'Некорректное значение',
            //min: () => 'Некорректное значение',
            min: (field, ref) => {
                var length = ref[0];
                return ("Не менее " + length + " символов.");
            },
            alpha_spaces: () => 'Только буквы и пробел',
            alpha: () => 'Только буквы',
            url: () => 'Некорректное значение',
            password: () => 'Некорректное значение',
            login: () => 'Некорректное значение',
            is: () => 'Некорректное значение',
            regex: () => 'Некорректное значение',
            alpha_num:  () => 'Только буквы и цифры'
        }
    }
};

export default dictionary
