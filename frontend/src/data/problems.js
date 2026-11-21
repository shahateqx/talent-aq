export const PROBLEMS = {
    "first-unique-character": {
        id: "first-unique-character",
        title: "First Unique Character",
        difficulty: "Easy",
        category: "String • Hash Map",
        description: {
            text: "Given a string s, find the first character that appears exactly once and return its index. If no such character exists, return -1.",
            notes: [
                "Scan the string from left to right — order matters.",
                "A single pass to count followed by a single pass to find the first unique is enough.",
            ],
        },
        examples: [
            { input: 's = "leetcode"', output: "0", explanation: "The letter 'l' at index 0 is the first character that appears once." },
            { input: 's = "loveleetcode"', output: "2", explanation: "'v' at index 2 is the first character that does not repeat." },
            { input: 's = "aabb"', output: "-1", explanation: "Every character appears more than once." },
        ],
        constraints: ["1 ≤ s.length ≤ 10⁵", "s contains only lowercase English letters"],
        starterCode: {
            javascript: `function firstUniqueChar(s) {
  // Write your solution here
  return -1;
}

console.log(firstUniqueChar("leetcode")); // 0
console.log(firstUniqueChar("loveleetcode")); // 2
console.log(firstUniqueChar("aabb")); // -1`,
            python: `def first_unique_char(s):
    # Write your solution here
    return -1

print(first_unique_char("leetcode"))  # 0
print(first_unique_char("loveleetcode"))  # 2
print(first_unique_char("aabb"))  # -1`,
            java: `class Main {
    public static int firstUniqueChar(String s) {
        // Write your solution here
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(firstUniqueChar("leetcode")); // 0
        System.out.println(firstUniqueChar("loveleetcode")); // 2
        System.out.println(firstUniqueChar("aabb")); // -1
    }
}`,
        },
        expectedOutput: { javascript: "0\n2\n-1", python: "0\n2\n-1", java: "0\n2\n-1" },
    },

    "valid-anagram": {
        id: "valid-anagram",
        title: "Valid Anagram",
        difficulty: "Easy",
        category: "String • Counting",
        description: {
            text: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram uses the exact same letters with the exact same frequencies, just in a different order.",
            notes: [
                "An anagram rearranges letters — no letters are added, removed, or changed.",
                "Strings may contain any lowercase English letters.",
            ],
        },
        examples: [
            { input: 's = "anagram", t = "nagaram"', output: "true", explanation: "Both strings contain three a's and one each of n, g, r, m." },
            { input: 's = "rat", t = "car"', output: "false", explanation: "The letter sets are different." },
            { input: 's = "aacc", t = "caca"', output: "true" },
        ],
        constraints: ["1 ≤ s.length, t.length ≤ 5 * 10⁴", "s and t consist of lowercase English letters"],
        starterCode: {
            javascript: `function isAnagram(s, t) {
  // Write your solution here
  return false;
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
console.log(isAnagram("aacc", "caca")); // true`,
            python: `def is_anagram(s, t):
    # Write your solution here
    return False

print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))  # False
print(is_anagram("aacc", "caca"))  # True`,
            java: `class Main {
    public static boolean isAnagram(String s, String t) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram")); // true
        System.out.println(isAnagram("rat", "car")); // false
        System.out.println(isAnagram("aacc", "caca")); // true
    }
}`,
        },
        expectedOutput: { javascript: "true\nfalse\ntrue", python: "True\nFalse\nTrue", java: "true\nfalse\ntrue" },
    },

    "fizzbuzz-sequence": {
        id: "fizzbuzz-sequence",
        title: "FizzBuzz Sequence",
        difficulty: "Easy",
        category: "Math • Simulation",
        description: {
            text: "Build the classic FizzBuzz sequence as a single string. For every number from 1 to n: print 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for multiples of both, and the number otherwise. Join the tokens with a single space.",
            notes: [
                "Check the multiple-of-both case before the individual cases.",
                "The returned value is a string, not an array — for n = 5 it is '1 2 Fizz 4 Buzz'.",
            ],
        },
        examples: [
            { input: "n = 5", output: "1 2 Fizz 4 Buzz" },
            { input: "n = 15", output: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz" },
            { input: "n = 1", output: "1" },
        ],
        constraints: ["1 ≤ n ≤ 100", "Return tokens separated by exactly one space, with no trailing space"],
        starterCode: {
            javascript: `function fizzBuzz(n) {
  // Write your solution here
  return "";
}

console.log(fizzBuzz(5));
console.log(fizzBuzz(15));
console.log(fizzBuzz(1));`,
            python: `def fizz_buzz(n):
    # Write your solution here
    return ""

print(fizz_buzz(5))
print(fizz_buzz(15))
print(fizz_buzz(1))`,
            java: `class Main {
    public static String fizzBuzz(int n) {
        // Write your solution here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(fizzBuzz(5));
        System.out.println(fizzBuzz(15));
        System.out.println(fizzBuzz(1));
    }
}`,
        },
        expectedOutput: {
            javascript: "1 2 Fizz 4 Buzz\n1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz\n1",
            python: "1 2 Fizz 4 Buzz\n1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz\n1",
            java: "1 2 Fizz 4 Buzz\n1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz\n1",
        },
    },

    "product-except-self": {
        id: "product-except-self",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        category: "Array • Prefix Products",
        description: {
            text: "Given an integer array nums, return an array answer such that answer[i] is the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.",
            notes: [
                "Prefix products on the way forward and suffix products on the way back will do it.",
                "The output array does not count as extra space for the complexity requirement.",
            ],
        },
        examples: [
            { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
            { input: "nums = [0,0]", output: "[0,0]" },
            { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
        ],
        constraints: ["2 ≤ nums.length ≤ 10⁵", "-30 ≤ nums[i] ≤ 30", "The product of any prefix fits in a 32-bit integer"],
        starterCode: {
            javascript: `function productExceptSelf(nums) {
  // Write your solution here
  return nums.map(() => 0);
}

console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]
console.log(productExceptSelf([0,0])); // [0,0]
console.log(productExceptSelf([-1,1,0,-3,3])); // [0,0,9,0,0]`,
            python: `def product_except_self(nums):
    # Write your solution here
    return [0] * len(nums)

print(product_except_self([1,2,3,4]))  # [24,12,8,6]
print(product_except_self([0,0]))  # [0,0]
print(product_except_self([-1,1,0,-3,3]))  # [0,0,9,0,0]`,
            java: `import java.util.*;

class Main {
    public static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        return new int[nums.length];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4}))); // [24,12,8,6]
        System.out.println(Arrays.toString(productExceptSelf(new int[]{0,0}))); // [0,0]
        System.out.println(Arrays.toString(productExceptSelf(new int[]{-1,1,0,-3,3}))); // [0,0,9,0,0]
    }
}`,
        },
        expectedOutput: {
            javascript: "[24,12,8,6]\n[0,0]\n[0,0,9,0,0]",
            python: "[24,12,8,6]\n[0,0]\n[0,0,9,0,0]",
            java: "[24,12,8,6]\n[0,0]\n[0,0,9,0,0]",
        },
    },

    "longest-substring": {
        id: "longest-substring",
        title: "Longest Substring Without Repeats",
        difficulty: "Medium",
        category: "String • Sliding Window",
        description: {
            text: "Given a string s, find the length of the longest substring without repeating characters.",
            notes: [
                "A sliding window with a pointer for the start and a pointer for the end works well.",
                "When a character repeats, move the start pointer just past its previous position.",
            ],
        },
        examples: [
            { input: 's = "abcabcbb"', output: "3", explanation: "The answer is 'abc', with a length of 3." },
            { input: 's = "bbbbb"', output: "1", explanation: "The answer is 'b'." },
            { input: 's = "pwwkew"', output: "3", explanation: "The answer is 'wke'. Note that 'pwke' is a subsequence, not a substring." },
        ],
        constraints: ["0 ≤ s.length ≤ 5 * 10⁴", "s consists of English letters, digits, symbols and spaces"],
        starterCode: {
            javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  return 0;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3`,
            python: `def length_of_longest_substring(s):
    # Write your solution here
    return 0

print(length_of_longest_substring("abcabcbb"))  # 3
print(length_of_longest_substring("bbbbb"))  # 1
print(length_of_longest_substring("pwwkew"))  # 3`,
            java: `class Main {
    public static int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // 3
        System.out.println(lengthOfLongestSubstring("bbbbb")); // 1
        System.out.println(lengthOfLongestSubstring("pwwkew")); // 3
    }
}`,
        },
        expectedOutput: { javascript: "3\n1\n3", python: "3\n1\n3", java: "3\n1\n3" },
    },

    "valid-sudoku": {
        id: "valid-sudoku",
        title: "Valid Sudoku",
        difficulty: "Medium",
        category: "Matrix • Hash Set",
        description: {
            text: "Determine if a 9x9 Sudoku board is valid according to the rules. Only the filled cells need to be validated — the board does not have to be solvable, just not contradictory.",
            notes: [
                "Each row, column, and 3x3 sub-box must contain the digits 1-9 without repetition.",
                "Empty cells are represented by the '.' character.",
                "The board is given as an array of 9 strings, each 9 characters long.",
            ],
        },
        examples: [
            {
                input: 'board = ["53..7....", "6..195...", ".98....6.", "8...6...3", "4..8.3..1", "7...2...6", ".6....28.", "...419..5", "....8..79"]',
                output: "true",
                explanation: "Every filled digit obeys the row, column, and box rules.",
            },
            {
                input: 'board = ["55..7....", ...]',
                output: "false",
                explanation: "The first row contains two 5s.",
            },
        ],
        constraints: ["board.length == 9", "board[i].length == 9", "board[i][j] is a digit or '.'"],
        starterCode: {
            javascript: `function isValidSudoku(board) {
  // Write your solution here
  return false;
}

const valid = ["53..7....","6..195...",".98....6.","8...6...3","4..8.3..1","7...2...6",".6....28.","...419..5","....8..79"];
const invalid = ["55..7....","6..195...",".98....6.","8...6...3","4..8.3..1","7...2...6",".6....28.","...419..5","....8..79"];

console.log(isValidSudoku(valid)); // true
console.log(isValidSudoku(invalid)); // false`,
            python: `def is_valid_sudoku(board):
    # Write your solution here
    return False

valid = ["53..7....","6..195...",".98....6.","8...6...3","4..8.3..1","7...2...6",".6....28.","...419..5","....8..79"]
invalid = ["55..7....","6..195...",".98....6.","8...6...3","4..8.3..1","7...2...6",".6....28.","...419..5","....8..79"]

print(is_valid_sudoku(valid))  # True
print(is_valid_sudoku(invalid))  # False`,
            java: `class Main {
    public static boolean isValidSudoku(String[] board) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        String[] valid = {"53..7....","6..195...",".98....6.","8...6...3","4..8.3..1","7...2...6",".6....28.","...419..5","....8..79"};
        String[] invalid = {"55..7....","6..195...",".98....6.","8...6...3","4..8.3..1","7...2...6",".6....28.","...419..5","....8..79"};
        System.out.println(isValidSudoku(valid)); // true
        System.out.println(isValidSudoku(invalid)); // false
    }
}`,
        },
        expectedOutput: { javascript: "true\nfalse", python: "True\nFalse", java: "true\nfalse" },
    },

    "set-mismatch": {
        id: "set-mismatch",
        title: "Set Mismatch",
        difficulty: "Medium",
        category: "Array • In-place Marking",
        description: {
            text: "You are given an array nums of length n where the numbers are supposed to be the set {1, 2, ..., n}, but one number is duplicated and another is missing. Find the duplicated number and the missing number, and return them as [duplicate, missing].",
            notes: [
                "Try to solve it in O(n) time and O(1) extra space by using the array itself to mark what you have seen.",
                "The duplicate may appear more than twice.",
            ],
        },
        examples: [
            { input: "nums = [1,2,2,4]", output: "[2,3]", explanation: "2 appears twice and 3 is missing." },
            { input: "nums = [1,1]", output: "[1,2]" },
        ],
        constraints: ["2 ≤ nums.length ≤ 10⁴", "1 ≤ nums[i] ≤ n", "Exactly one number is duplicated and one is missing"],
        starterCode: {
            javascript: `function findErrorNums(nums) {
  // Write your solution here
  return [-1, -1];
}

console.log(findErrorNums([1,2,2,4])); // [2,3]
console.log(findErrorNums([1,1])); // [1,2]`,
            python: `def find_error_nums(nums):
    # Write your solution here
    return [-1, -1]

print(find_error_nums([1,2,2,4]))  # [2,3]
print(find_error_nums([1,1]))  # [1,2]`,
            java: `import java.util.*;

class Main {
    public static int[] findErrorNums(int[] nums) {
        // Write your solution here
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(findErrorNums(new int[]{1,2,2,4}))); // [2,3]
        System.out.println(Arrays.toString(findErrorNums(new int[]{1,1}))); // [1,2]
    }
}`,
        },
        expectedOutput: { javascript: "[2,3]\n[1,2]", python: "[2,3]\n[1,2]", java: "[2,3]\n[1,2]" },
    },

    "coin-change": {
        id: "coin-change",
        title: "Coin Change",
        difficulty: "Medium",
        category: "Array • Dynamic Programming",
        description: {
            text: "You are given an array of coin denominations and an integer amount. Return the fewest number of coins needed to make up that amount. If it cannot be made, return -1. You have an unlimited supply of each coin.",
            notes: [
                "Order of coins does not matter — only the count does.",
                "A bottom-up DP where dp[x] is the minimum coins for amount x works nicely.",
            ],
        },
        examples: [
            { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1, using three coins." },
            { input: "coins = [2], amount = 3", output: "-1", explanation: "It is impossible to make 3 with only 2s." },
            { input: "coins = [1], amount = 0", output: "0" },
        ],
        constraints: ["1 ≤ coins.length ≤ 12", "1 ≤ coins[i] ≤ 2³¹ - 1", "0 ≤ amount ≤ 10⁴"],
        starterCode: {
            javascript: `function coinChange(coins, amount) {
  // Write your solution here
  return -1;
}

console.log(coinChange([1,2,5], 11)); // 3
console.log(coinChange([2], 3)); // -1
console.log(coinChange([1], 0)); // 0`,
            python: `def coin_change(coins, amount):
    # Write your solution here
    return -1

print(coin_change([1,2,5], 11))  # 3
print(coin_change([2], 3))  # -1
print(coin_change([1], 0))  # 0`,
            java: `class Main {
    public static int coinChange(int[] coins, int amount) {
        // Write your solution here
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(coinChange(new int[]{1,2,5}, 11)); // 3
        System.out.println(coinChange(new int[]{2}, 3)); // -1
        System.out.println(coinChange(new int[]{1}, 0)); // 0
    }
}`,
        },
        expectedOutput: { javascript: "3\n-1\n0", python: "3\n-1\n0", java: "3\n-1\n0" },
    },

    "trapping-rain-water": {
        id: "trapping-rain-water",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        category: "Array • Two Pointers",
        description: {
            text: "Given an array of non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
            notes: [
                "For each position, the water above it is limited by the shorter of the tallest wall to its left and the tallest wall to its right.",
                "A two-pointer approach can do this in O(n) time and O(1) space.",
            ],
        },
        examples: [
            { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "The elevation map traps 6 units of water." },
            { input: "height = [4,2,0,3,2,5]", output: "9" },
        ],
        constraints: ["n == height.length", "1 ≤ n ≤ 2 * 10⁴", "0 ≤ height[i] ≤ 10⁵"],
        starterCode: {
            javascript: `function trap(height) {
  // Write your solution here
  return 0;
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5])); // 9`,
            python: `def trap(height):
    # Write your solution here
    return 0

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # 6
print(trap([4,2,0,3,2,5]))  # 9`,
            java: `class Main {
    public static int trap(int[] height) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); // 6
        System.out.println(trap(new int[]{4,2,0,3,2,5})); // 9
    }
}`,
        },
        expectedOutput: { javascript: "6\n9", python: "6\n9", java: "6\n9" },
    },

    "largest-rectangle": {
        id: "largest-rectangle",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        category: "Stack • Monotonic",
        description: {
            text: "Given an array of integers representing the heights of histogram bars with width 1, return the area of the largest rectangle that can be formed in the histogram.",
            notes: [
                "For every bar, find how far to the left and right it can extend while all bars are at least as tall as it.",
                "A monotonic stack of increasing heights finds those boundaries in one pass.",
            ],
        },
        examples: [
            { input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "The largest rectangle uses bars of height 2 and 5 (2 * 5 = 10)." },
            { input: "heights = [1]", output: "1" },
        ],
        constraints: ["1 ≤ heights.length ≤ 10⁵", "0 ≤ heights[i] ≤ 10⁴"],
        starterCode: {
            javascript: `function largestRectangleArea(heights) {
  // Write your solution here
  return 0;
}

console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
console.log(largestRectangleArea([1])); // 1`,
            python: `def largest_rectangle_area(heights):
    # Write your solution here
    return 0

print(largest_rectangle_area([2,1,5,6,2,3]))  # 10
print(largest_rectangle_area([1]))  # 1`,
            java: `class Main {
    public static int largestRectangleArea(int[] heights) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(largestRectangleArea(new int[]{2,1,5,6,2,3})); // 10
        System.out.println(largestRectangleArea(new int[]{1})); // 1
    }
}`,
        },
        expectedOutput: { javascript: "10\n1", python: "10\n1", java: "10\n1" },
    },
};

export const LANGUAGE_CONFIG = {
    javascript: {
        name: "JavaScript",
        icon: "/javascript.svg",
        monacoLang: "javascript",
    },
    python: {
        name: "Python",
        icon: "/python.svg",
        monacoLang: "python",
    },
    java: {
        name: "Java",
        icon: "/java.svg",
        monacoLang: "java",
    },
};
