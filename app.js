Vue.component('random-generator', {
  template: `
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Random Generator
      </h1>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Minimum</label>
            <input v-model.number="min" type="number"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Maximum</label>
            <input v-model.number="max" type="number"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition">
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Mode</label>
          <select v-model="mode"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
            <option value="random">Random (boleh duplikat)</option>
            <option value="unique">Unik (hanya sekali)</option>
          </select>
        </div>

        <button @click="generate" :disabled="isButtonDisabled"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          Generate Number
        </button>

        <div v-if="result !== null" class="mt-6 p-4 bg-gray-50 rounded-lg text-center fade-in">
          <p class="text-sm text-gray-600">Your random number:</p>
          <p class="text-4xl font-bold text-blue-600 mt-2">{{ result }}</p>
          <p v-if="mode === 'unique'" class="text-sm text-gray-500 mt-2">
            Tersisa: {{ remainingNumbers }} angka unik
          </p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      min: 1,
      max: 100,
      mode: 'random',
      result: null,
      usedNumbers: new Set()
    };
  },
  computed: {
    remainingNumbers() {
      return (this.max - this.min + 1) - this.usedNumbers.size;
    },
    isButtonDisabled() {
      return this.mode === 'unique' && this.remainingNumbers === 0;
    }
  },
  watch: {
    mode() { this.usedNumbers.clear(); },
    min() { this.usedNumbers.clear(); },
    max() { this.usedNumbers.clear(); }
  },
  methods: {
    generate() {
      if (this.mode === 'unique' && this.remainingNumbers === 0) {
        alert('Semua angka unik sudah digunakan!');
        return;
      }
      
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
      } while (
        this.mode === 'unique' &&
        this.usedNumbers.has(randomNum) &&
        this.remainingNumbers > 0
      );
      
      this.result = randomNum;
      
      if (this.mode === 'unique') {
        this.usedNumbers.add(randomNum);
      }
    }
  }
});
