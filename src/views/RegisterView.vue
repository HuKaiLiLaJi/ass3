<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import db from "../firebase/init.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  limit,
} from "firebase/firestore";

const router = useRouter();
const fireAuth = getAuth();

const formData = ref({
  username: "",
  password: "",
  gender: "",
});

const submitForm = async () => {
  validateName(true);
  validatePassword(true);
  validateConfirmPassword(true);
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.reason &&
    !errors.value.validateFriend
  ) {

    await createUserWithEmailAndPassword(
      fireAuth,
      formData.value.username,
      formData.value.password
    ).catch((error) => {
      console.error(error.code);
      alert("Register error:" + error.code)
      //throw new Error("Register error");
    });

    const q = await query(
      collection(db, "users"),
      where("email", "==", formData.value.username),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);

    if (querySnapshot.empty) {
      await addDoc(collection(db, "users"), {
        email: formData.value.username,
        gender: formData.value.gender,
        role: "customer",
        createdAt: serverTimestamp(),
      })
        .then(() => {
          alert("Register success!")
          clearForm();
          router.push("/login").then(() => {
            location.reload();
          });
          // setTimeout(() => {

          // }, 3000);
        })
        .catch((error) => {
          console.error("Error adding document:", error.code);
          alert(error.code);
        });
    } else {
      alert("This email has already been registered")
    }

    //
  }
};

const clearForm = () => {
  formData.value = {
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  };
};

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  gender: null,
});

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = "Name must be at least 3 characters";
  } else {
    errors.value.username = null;
  }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur)
      errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur)
      errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur)
      errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur)
      errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
};
/**
 * Confirm password validation function that checks if the password and confirm password fields match.
 * @param blur: boolean - If true, the function will display an error message if the passwords do not match.
 */
const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = "Passwords do not match.";
  } else {
    errors.value.confirmPassword = null;
  }
};
</script>

<template>
  <!-- 🗄️ W3. Library Registration Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 offset-md-2">
        <h1 class="text-center">Create an Account</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input type="email" class="form-control" id="username" @blur="() => validateName(true)"
                @input="() => validateName(false)" v-model="formData.username" />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)" v-model="formData.password" />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input type="password" class="form-control" id="confirm-password"
                @blur="() => validateConfirmPassword(true)" @input="() => validateConfirmPassword(false)"
                v-model="formData.confirmPassword" />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.list-group-item {
  padding: 10px;
}
</style>
/* /*configure fnm environment*/*/ fnm env --use-on-cd | Out-String | Invoke-Expression
npm run dev
