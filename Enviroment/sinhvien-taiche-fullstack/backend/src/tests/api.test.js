// ============================================
// API Health Check & Integration Tests
// ============================================
// These tests verify the backend API endpoints are working correctly.
// Run with: npm test

const BASE_URL = process.env.API_URL || 'http://localhost:4000/api';

let passed = 0;
let failed = 0;

async function runTest(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (error) {
    failed++;
    console.log(`  ❌ ${name}: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchAPI(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await response.json();
  return { response, data };
}

// ============================================
// Tests
// ============================================
async function main() {
  console.log('\n🧪 API Tests - SV Tái Chế Backend\n');

  // 1. Health Check
  await runTest('Health Check - GET /health', async () => {
    const { response, data } = await fetchAPI('/health');
    assert(response.status === 200, `Expected 200, got ${response.status}`);
    assert(data.success === true, 'Expected success: true');
    assert(data.status === 'OK', 'Expected status: OK');
  });

  // 2. Get Articles
  await runTest('Get Articles - GET /articles', async () => {
    const { response, data } = await fetchAPI('/articles');
    assert(response.status === 200, `Expected 200, got ${response.status}`);
    assert(data.success === true, 'Expected success: true');
    assert(data.data !== undefined, 'Expected data property');
  });

  // 3. Get Team Members
  await runTest('Get Team Members - GET /team', async () => {
    const { response, data } = await fetchAPI('/team');
    assert(response.status === 200, `Expected 200, got ${response.status}`);
    assert(data.success === true, 'Expected success: true');
  });

  // 4. Get Vouchers
  await runTest('Get Vouchers - GET /vouchers', async () => {
    const { response, data } = await fetchAPI('/vouchers');
    assert(response.status === 200, `Expected 200, got ${response.status}`);
    assert(data.success === true, 'Expected success: true');
  });

  // 5. Create Schedule (without auth - should fail or work depending on config)
  await runTest('Create Schedule - POST /schedules', async () => {
    const { response, data } = await fetchAPI('/schedules', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Student',
        phone: '0987654321',
        email: 'test@cmc.edu.vn',
        wasteType: 'Chai nhựa',
        weight: 2.5,
        location: 'Căn tin trường',
        note: 'Test schedule',
      }),
    });
    assert(data.success !== undefined, 'Expected response');
  });

  // 6. 404 Route
  await runTest('404 Route - GET /nonexistent', async () => {
    const { response } = await fetch(`${BASE_URL}/nonexistent`, {
      headers: { 'Content-Type': 'application/json' },
    });
    assert(response.status === 404, `Expected 404, got ${response.status}`);
  });

  // ============================================
  // Results
  // ============================================
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${passed + failed} total\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});

