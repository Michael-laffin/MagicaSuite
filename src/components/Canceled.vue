<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div class="mb-4">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Payment Canceled</h2>
      <p class="text-gray-600 mb-8">
        Your payment was canceled. No charges were made to your account.
      </p>
      <router-link
        to="/pricing"
        class="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Return to Pricing
      </router-link>
    </div>
  </div>
</template>

<script setup>
// You can add any additional logic here if needed
</script>
