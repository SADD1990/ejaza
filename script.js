document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const whatsappNumber = '966564492042'; // رقم الواتساب بدون علامة + أو أصفار دولية بادئة

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال التقليدي
        if (validateForm()) {
            // إذا كانت البيانات صحيحة، قم بالتوجيه إلى واتساب
            // يمكنك بناء رسالة مبدئية إذا أردت
            // let messageBody = "بيانات الطلب:\n";
            // new FormData(form).forEach((value, key) => {
            //    const label = form.querySelector(`label[for="${key}"]`);
            //    if (label && value) { // إرسال البيانات الموجودة فقط والتي لها عنوان
            //        messageBody += `${label.innerText.replace('*','').trim()}: ${value}\n`;
            //    }
            // });
            // const encodedMessage = encodeURIComponent(messageBody);
            // window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // توجيه مباشر بدون رسالة مبدئية أو برسالة بسيطة
             const defaultMessage = encodeURIComponent("السلام عليكم ورحمة الله وبركاته ، أرغب في الحصول على إجازة");
             window.location.href = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
            
            // يمكنك اختيار إعادة تعيين النموذج بعد التوجيه أو لا
            // form.reset(); 
            // clearValidationStyles(); // قد لا تحتاج لمسح الأنماط إذا تم التوجيه مباشرة
        } else {
            const firstErrorField = form.querySelector('.invalid');
            if (firstErrorField) {
                firstErrorField.focus();
                // التمرير إلى أول حقل خطأ ليكون مرئيًا
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    function validateForm() {
        let isValid = true;
        clearValidationStyles();

        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'هذا الحقل مطلوب.');
            }
        });

        const emailField = document.getElementById('email');
        if (emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
            isValid = false;
            showError(emailField, 'الرجاء إدخال بريد إلكتروني صحيح.');
        }

        const mobileField = document.getElementById('mobileNumber');
        if (mobileField.hasAttribute('required') && mobileField.value.trim() === '') {
             // تم التعامل معه بواسطة التحقق من الحقول المطلوبة أعلاه
        } else if (mobileField.value.trim() !== '' && !mobileField.checkValidity()) { 
             isValid = false;
             showError(mobileField, mobileField.title || 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام.');
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(inputElement, message) {
        inputElement.classList.remove('valid'); // تأكد من إزالة valid إذا كان موجودًا
        inputElement.classList.add('invalid');
        const fieldContainer = inputElement.closest('.form-group');
        if (!fieldContainer) return; // حماية إذا لم يتم العثور على الحاوية

        let errorMessage = fieldContainer.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('small');
            errorMessage.className = 'error-message';
            // إدراج رسالة الخطأ بعد الحقل (أو الليبل إذا كان الحقل هو الأخير)
            fieldContainer.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }

    // دالة showSuccess ليست ضرورية بشكل كبير إذا كنا نركز على إظهار الأخطاء فقط
    // ولكن يمكن تركها أو تعديلها إذا أردت إظهار علامات النجاح
    function showSuccess(inputElement) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        const fieldContainer = inputElement.closest('.form-group');
        if (!fieldContainer) return;
        let errorMessage = fieldContainer.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function clearValidationStyles() {
        form.querySelectorAll('.invalid').forEach(el => {
            el.classList.remove('invalid');
            // إذا كنت تستخدم خلفيات خاصة للخطأ، أعدها هنا
            if(el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'email' || el.type === 'tel' || el.type === 'number' || el.type === 'date')){
                el.style.backgroundColor = ""; // أو اللون الأصلي الشفاف/الفاتح
            } else if (el.tagName === 'SELECT'){
                 el.style.backgroundColor = ""; // أو اللون الأصلي
            }
        });
        form.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
        form.querySelectorAll('.error-message').forEach(el => el.remove());
    }
});
