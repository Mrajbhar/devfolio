export const LEETCODE_QUERY =
  '{matchedUser(username:"Mrajbhar"){submitStatsGlobal{acSubmissionNum{difficulty count}} userCalendar{totalActiveDays submissionCalendar}}}'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end()
  }
  try {
    const r = await fetch(`https://leetcode.com/graphql?query=${encodeURIComponent(LEETCODE_QUERY)}`, {
      headers: { Referer: 'https://leetcode.com' },
    })
    if (!r.ok) throw new Error(`LeetCode responded ${r.status}`)
    const data = await r.json()
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=86400')
    return res.status(200).json(data)
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(502).json({ error: 'LeetCode unavailable' })
  }
}
