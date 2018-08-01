export function getHost() {
  // const dummyContextPath = 'https://humci.pih-emr.org/mirebalais/ws/rest/v1';
  // const dummyContextPath = 'https://humci-azure.pih-emr.org/mirebalais/ws/rest/v1';
  const dummyContextPath = 'https://oncology-test.pih-emr.org/mirebalais/ws/rest/v1';

  try {
    const host = window.location.origin;
    if (host.includes('localhost')) {
      throw new Error('running against localhost, using dummy server')
    }
    const distro = window.location.pathname.split( '/' )[1]
    const contextPath = `${host}/${distro}`;
    const apiBaseUrl = `${contextPath}/ws/rest/v1`;
    return apiBaseUrl;
  } catch (error) {
    return dummyContextPath
  }
}

export function getHeaders() {
  return {
    Authorization: `Basic ${btoa('pravesh:admin123')}`,
    'Content-Type': 'application/json',
  }
}
