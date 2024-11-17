<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div class="mb-4">
        <svg class="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
      <p class="text-gray-600 mb-8">
        Thank you for your subscription. Your account has been successfully upgraded.
      </p>
      <router-link
        to="/dashboard"
        class="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  // Get the session ID from the URL
  const sessionId = route.query.session_id;
  console.log('Payment successful with session ID:', sessionId);
  // You can make an API call here to verify the session if needed
});
</script>
