document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال التقليدي
        if (validateForm()) {
            alert('تم إرسال الطلب بنجاح!'); // يمكنك هنا إرسال البيانات عبر AJAX
            form.reset(); // إعادة تعيين الحقول بعد الإرسال الناجح
            clearValidationStyles();
        } else {
            alert('يرجى تصحيح الأخطاء في النموذج.');
        }
    });

    function validateForm() {
        let isValid = true;
        clearValidationStyles(); // مسح أنماط التحقق السابقة

        // التحقق من الحقول المطلوبة
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'هذا الحقل مطلوب.');
            } else {
                showSuccess(field);
            }
        });

        // التحقق من البريد الإلكتروني
        const emailField = document.getElementById('email');
        if (emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
            isValid = false;
            showError(emailField, 'الرجاء إدخال بريد إلكتروني صحيح.');
        } else if (emailField.value.trim()) {
            showSuccess(emailField);
        }

        // التحقق من رقم الجوال
        const mobileField = document.getElementById('mobileNumber');
        const mobilePattern = /^05[0-9]{8}$/;
        if (mobileField.value.trim() && !mobilePattern.test(mobileField.value.trim())) {
            isValid = false;
            showError(mobileField, 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام.');
        } else if (mobileField.value.trim() && mobilePattern.test(mobileField.value.trim())) {
             showSuccess(mobileField);
        }


        // يمكنك إضافة المزيد من قواعد التحقق هنا (مثال: طول رقم الهوية، إلخ)

        return isValid;
    }

    function isValidEmail(email) {
        // تعبير نمطي بسيط للتحقق من البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(inputElement, message) {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        let errorMessage = inputElement.parentNode.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('small');
            errorMessage.className = 'error-message';
            inputElement.parentNode.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }

    function showSuccess(inputElement) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        let errorMessage = inputElement.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function clearValidationStyles() {
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        form.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
        form.querySelectorAll('.error-message').forEach(el => el.remove());
    }

    // إضافة تلميحات تفاعلية أو تحسينات أخرى عند الحاجة
    // مثال: تغيير لون الحدود عند التركيز (تم التعامل معه بـ CSS :focus)
});