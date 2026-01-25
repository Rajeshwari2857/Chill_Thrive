document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('booking-form');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    let currentStep = 1;

    initializeForm();

    function initializeForm() {
        showStep(currentStep);
        addStepListeners();
        addNavigationButtons();
        addFormSubmit();
    }

    function showStep(step) {
        // Remove active class from all steps and indicators
        steps.forEach(el => el.classList.remove('active'));
        stepIndicators.forEach(el => el.classList.remove('active'));

        // Add active class to current step
        document.getElementById(`step-${step}`).classList.add('active');
        document.querySelector(`[data-step="${step}"]`).classList.add('active');

        // Smooth scroll to form ONLY if user clicks navigation (not on initial load)
        // Removed automatic scroll on page load
    }

    function addStepListeners() {
        stepIndicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const targetStep = parseInt(this.dataset.step);

                // Allow going back to previous steps
                if (targetStep < currentStep) {
                    currentStep = targetStep;
                    showStep(currentStep);
                    scrollToForm(); // Scroll only when user clicks
                } 
                // Allow going forward if current step is valid
                else if (validateCurrentStep()) {
                    currentStep = targetStep;
                    showStep(currentStep);
                    scrollToForm(); // Scroll only when user clicks
                }
            });
        });
    }

    function scrollToForm() {
        document.querySelector('.booking-wrapper').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    function validateCurrentStep() {
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        const radioGroups = {};

        // Validate radio buttons
        currentStepElement.querySelectorAll('input[type="radio"][required]').forEach(input => {
            if (!radioGroups[input.name]) {
                radioGroups[input.name] = false;
            }
            if (input.checked) {
                radioGroups[input.name] = true;
            }
        });

        for (let name in radioGroups) {
            if (!radioGroups[name]) {
                alert(`Please select a ${name}`);
                return false;
            }
        }

        // Validate text, email, tel, and date inputs
        currentStepElement.querySelectorAll(
            'input[type="text"][required], ' +
            'input[type="date"][required], ' +
            'input[type="email"][required], ' +
            'input[type="tel"][required]'
        ).forEach(input => {
            if (!input.value.trim()) {
                alert(`Please fill in ${input.placeholder || input.name}`);
                return false;
            }
        });

        return true;
    }

    function addNavigationButtons() {
        const formSteps = document.querySelectorAll('.form-step');

        formSteps.forEach((step, index) => {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-group';

            // Add Back button (not on first step)
            if (index > 0) {
                const backBtn = document.createElement('button');
                backBtn.type = 'button';
                backBtn.className = 'back-btn';
                backBtn.textContent = '← Back';
                backBtn.addEventListener('click', () => {
                    currentStep--;
                    showStep(currentStep);
                    scrollToForm(); // Scroll when user clicks back
                });
                buttonContainer.appendChild(backBtn);
            }

            // Add Next button (not on last step)
            if (index < formSteps.length - 1) {
                const nextBtn = document.createElement('button');
                nextBtn.type = 'button';
                nextBtn.className = 'next-btn';
                nextBtn.textContent = 'Next →';
                nextBtn.addEventListener('click', () => {
                    if (validateCurrentStep()) {
                        currentStep++;
                        showStep(currentStep);
                        scrollToForm(); // Scroll when user clicks next
                    }
                });
                buttonContainer.appendChild(nextBtn);
            } 
            // Add Confirm button on last step
            else {
                const confirmBtn = document.createElement('button');
                confirmBtn.type = 'submit';
                confirmBtn.className = 'confirm-btn';
                confirmBtn.textContent = 'Confirm My Recovery';
                buttonContainer.appendChild(confirmBtn);
            }

            step.appendChild(buttonContainer);
        });
    }


function addFormSubmit() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateCurrentStep()) return;

        const formData = new FormData(form);

        // Raw values from form
        const service = formData.get('service');
        const time = formData.get('time');
        const date = formData.get('date');

        // Convert to DB-friendly integers
        const recovery_path = RECOVERY_PATH_MAP[service];
        const slot = SLOT_MAP[time];

        if (!recovery_path || !slot) {
            alert("Invalid selection. Please try again.");
            return;
        }

        // Payload matches your SQLAlchemy model
        const payload = {
            recovery_path: recovery_path, // INT
            date: date,                    // YYYY-MM-DD
            slot: slot                     // INT
        };

        fetch('/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error("Booking failed");
            return res.json();
        })
        .then(data => {
            showSuccessMessage({
                service,
                date,
                time
            });

            form.reset();
            currentStep = 1;
            showStep(currentStep);
        })
        .catch(err => {
            alert("Something went wrong. Please try again.");
            console.error(err);
        });
    });
}

    function showSuccessMessage(data) {
        const message = `✅ Booking Confirmed!\n\nService: ${data.service.toUpperCase().replace('-', ' ')}\nDate: ${data.date}\nTime: ${data.time}\nName: ${data.name}\n\nConfirmation email sent to ${data.email}`;
        alert(message);
    }
});