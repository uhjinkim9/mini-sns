/**
 * Get a Korean-time
 * @return {Date} 현재 한국 시각
 */
function getKoreaTime() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC + 9시간
  return koreaTime;
}

const time = { getKoreaTime };
export default time;
