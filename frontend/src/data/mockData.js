// Mock data that matches the required API schema exactly
export const MOCK_BATTLE = {
  problem:
    "Write a function to find the longest palindromic substring in a given string. Return the substring itself. Handle edge cases for empty strings and single characters.",
  solution_1: `function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0;
  let maxLen = 1;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        start = l;
        maxLen = r - l + 1;
      }
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);      // odd length
    expand(i, i + 1);  // even length
  }

  return s.substring(start, start + maxLen);
}

// Time:  O(n²)
// Space: O(1)
//
// "Expand Around Center" — for each character,
// we expand outward as long as it forms a palindrome.
// One pass handles both odd and even lengths.`,

  solution_2: `def longest_palindrome(s: str) -> str:
    if len(s) < 2:
        return s
    
    # Manacher's Algorithm — O(n) time
    t = "#" + "#".join(s) + "#"
    n = len(t)
    p = [0] * n
    c = r = 0

    for i in range(n):
        mirror = 2 * c - i
        if i < r:
            p[i] = min(r - i, p[mirror])

        while (i + p[i] + 1 < n and
               i - p[i] - 1 >= 0 and
               t[i + p[i] + 1] == t[i - p[i] - 1]):
            p[i] += 1

        if i + p[i] > r:
            c, r = i, i + p[i]

    max_len = max(p)
    center  = p.index(max_len)
    start   = (center - max_len) // 2

    return s[start : start + max_len]

# Time:  O(n)
# Space: O(n)`,

  judge: {
    solution_1_score: 7.8,
    solution_2_score: 9.2,
    solution_1_reasoning:
      "The expand-around-center approach is clean, intuitive, and interview-ready. The O(n²) time complexity is acceptable for most inputs, while the O(1) space usage is a real strength. Code structure is excellent — the helper function eliminates duplication and variable naming is clear throughout.",
    solution_2_reasoning:
      "Manacher's Algorithm achieves the theoretical optimum: O(n) time with O(n) space. This demonstrates advanced algorithmic knowledge. The transformed string technique elegantly unifies odd/even palindromes. However, the implementation is less readable for a general audience and would require thorough inline documentation in production code.",
  },
};

export const MODEL_ALPHA = {
  name:     "Model Alpha",
  key:      "alpha",
  language: "JavaScript",
  langShort: "JS",
};

export const MODEL_OMEGA = {
  name:     "Model Omega",
  key:      "omega",
  language: "Python",
  langShort: "PY",
};
