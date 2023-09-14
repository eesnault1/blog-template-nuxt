<template>
  <div class="form-section">
    <h2>CONTACTEZ-NOUS !</h2>
    <form class="form" @submit.prevent="sendEmail">
      <div class="form-contact">
        <div class="form-contact__input">
          <div class="form-contact__containeur">
            <label for="email" class="form-contact__label">Email</label>
            <input
              id="email"
              v-model="from"
              :class="!emailValid ? 'form-contact__form-error' : 'form-contact__form'"
              placeholder="Votre email"
            >
            <div v-if="!emailValid && isSend" class="error-message">
              Veuillez entrer une adresse email valide.
            </div>
          </div>

          <div class="form-contact__containeur">
            <label for="subject" class="form-contact__label">Objet</label>
            <input
              id="subject"
              v-model="subject"
              class="form-contact__subject"
              :class="!subjectLengthValid ? 'form-contact__form-error' : 'form-contact__text'"
              placeholder="Objet"
            >
            <div v-if="!subjectLengthValid && isSend" class="error-message">
              L'objet doit contenir au moins 10 caractères.
            </div>
          </div>
        </div>

        <div class="form-contact__containeur">
          <label for="message" class="form-contact__label">Message</label>
          <textarea
            id="message"
            v-model="text"
            class="form-contact__text"
            placeholder="Entrer votre message ici"
            :class="!textLengthValid ? 'form-contact__form-error' : 'form-contact__text'"
          />
        </div>

        <div v-if="!textLengthValid && isSend" class="error-message">
          Le message doit contenir au moins 30 caractères.
        </div>
      </div>
      <TheButton type="submit">
        Envoyer l'email
      </TheButton>
      <div v-if="emailSend" :disabled="isSubmitting" class="sucess-send">
        Email envoyé avec succès
      </div>
    </form>
  </div>
</template>

<script setup>

// Gère les sends
const isSend = ref(false)

// Gère le bouton
const isSubmitting = ref(false)

// Vérifie les différents champs
const emailValid = computed(() => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(from.value))
const textLengthValid = computed(() => text.value.length >= 30)
const subjectLengthValid = computed(() => subject.value.length >= 10)
const canSubmit = computed(() => emailValid.value && textLengthValid.value && subjectLengthValid.value)

// Const du formulaire
const mail = useMail()
const from = ref('')
const subject = ref('')
const text = ref('')
const emailSend = ref(false)

// FOnction send EMail
const sendEmail = async () => {
  isSend.value = true

  // Pour vérifier que tous les champs sont bons
  if (!canSubmit.value) { return }

  // Pour éviter qu'il y ait trop de demande de contact d'un coup
  if (isSubmitting.value) { return }
  isSubmitting.value = true
  try {
    await mail.send({
      from: from.value,
      replyTo: from.value,
      subject: subject.value,
      text: text.value
    })
    from.value = ''
    subject.value = ''
    text.value = ''
    emailSend.value = true
    isSend.value = false
    setTimeout(() => {
      emailSend.value = false
    }, 3000)

    setTimeout(() => {
      isSubmitting.value = false
    }, 60000)
  } catch (error) {
    isSubmitting.value = false
    console.error('Erreur lors de l\'envoi de l\'email:', error)
  }
}

</script>

  <style scoped>
h2{
    margin-bottom: 20px;
}
  .form-section {
      margin: 20px auto;
      width: 90%;

  }

  .show-contact {
    margin: 20px 0 30px 0;
  }
   .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      justify-content: center;

   }

   .form-contact {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: start;
      justify-content: center;
   }

   .form-contact__input {
    display: flex;
    align-items: center;
    gap: 50px;
   }
   .form-contact__containeur {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: start;
      width : 100%;
   }

   .form-contact__label {
      color: var(--main-color);
      font-size: 1.2rem;
   }

   .form-contact__form,
   .form-contact__subject,
   .form-contact__text {
      border : 1px solid var(--main-color);
      border-radius: 5px;
      color: var(--main-color);
      padding: 5px;
      outline: none;
   }

   .form-contact__form:focus,
   .form-contact__subject:focus,
    .form-contact__text:focus {
      border: 1px solid transparent;
      box-shadow: 0 0 0 3px var(--main-color);
  }

  .form-contact__form-error{
      border : 1px solid var(--main-color);
      border-radius: 5px;
      color: var(--main-color);
      padding: 5px;
      outline: none;
   }

  .form-contact__form-error:focus {
    border: 1px solid transparent;
      box-shadow: 0 0 0 3px var(--error);
  }

   .form-contact__text {
      width: 100%;
      overflow-y: hidden;
      resize: none;
    }

    .sucess-send {
      color: rgb(75, 219, 75);
      font-size: 1.3rem;

    }

    .error-message {
    color: var(--error-color);
    font-size: 1rem;
    margin-top: 10px;
  }

  </style>
