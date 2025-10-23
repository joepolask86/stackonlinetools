import { ToolMetadata, CategoryInfo, ToolCategory } from "@/types/tool";

/**
 * Tool registry - Central source of truth for all tools
 */
export const toolsMetadata: ToolMetadata[] = [
  // Text Tools
  {
    id: "case-converter",
    slug: "case-converter",
    name: "Case Converter",
    description: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, and more",
    category: "text",
    subcategory: "Text Transformation",
    icon: "Type",
    status: "implemented",
    isTrending: true,
    contentHtml: `
      <h2>What is Online Case Converter?</h1>
      <p><strong>Online case converter</strong> is a <strong>text transformation tool</strong> that instantly changes the capitalization style of your text without manual editing. Whether you're a content writer, developer, student, or social media manager, this free utility streamlines the process of reformatting text to match specific style guidelines or presentation requirements.</p>
      <p>This <strong>web-based application</strong> eliminates the tedious task of retyping content when you need different <strong>letter case formats</strong>. Simply paste your text into the converter, select your desired <strong>capitalization style</strong>, and receive professionally formatted results in seconds. The tool supports various text case transformations, making it indispensable for document formatting, coding conventions, email communication, and digital content creation.</p>
      <p><strong>Case conversion tools</strong> are essential for maintaining consistency across professional documents, adhering to SEO best practices, and ensuring proper <strong>text formatting</strong> for different platforms. They help users avoid <strong>capitalization errors</strong> that can undermine credibility and professionalism in written communication.</p>
      <h2>Available Letter Case Types:</h2>
      <ul>
      <li><strong>Sentence case</strong>: Capitalizes only the first letter of each sentence while converting the rest to lowercase. Perfect for standard paragraph writing and natural-looking text that follows grammatical conventions.</li>
      <li><strong>lower case</strong>: Transforms all characters into lowercase letters. Ideal for creating <strong>URLs</strong>, email addresses, hashtags, and programming identifiers that require uniform lowercase formatting.</li>
      <li><strong>UPPER CASE</strong>: Converts every letter to uppercase characters. Commonly used for <strong>headings</strong>, acronyms, emphasis, and attention-grabbing announcements in marketing materials.</li>
      <li><strong>Capitalize Case</strong>: Capitalizes the first letter of every word while keeping other letters lowercase. Useful for proper nouns, names, and titles where each word requires initial capitalization.</li>
      <li><strong>aLtErNaTiNg cAsE</strong>: Creates a pattern alternating between lowercase and uppercase letters. </li>
      <li><strong>Title Case</strong>: Applies capitalization rules for titles by capitalizing major words while keeping articles, conjunctions, and prepositions lowercase.</li>
      <li><strong>Title Case</strong>: Applies capitalization rules for titles by capitalizing major words while keeping articles, conjunctions, and prepositions lowercase.
      </li>
      <li><strong>InVeRsE CaSe</strong>: Reverses the existing capitalization pattern, converting uppercase to lowercase and vice versa.</li>
      </ul>

      <h2>How to Use the Case Converter?</h2>
      <p>Using this <strong>text case converter</strong> is straightforward and requires no technical expertise. The intuitive interface ensures that anyone can transform their text within seconds, regardless of technical background.</p>
      <p>Follow these simple steps to convert your text to any desired capitalization format:</p>
      <ol>
      <li><strong>Copy Your Text</strong>: Select and copy the text you want to convert from any source—word processors, emails, websites, PDFs, or note-taking applications.</li>
      <li><strong>Paste Into Input Field</strong>: Click on the text area and paste your copied content into the converter's input box using Ctrl+V (Windows) or Cmd+V (Mac).</li>
      <li>
      <strong>Select Desired Case Format</strong>: Choose your preferred <strong>case style</strong> by clicking the corresponding button from the available options displayed on the interface.</li>
      <li>
      <strong>View Instant Results</strong>: The tool automatically <strong>processes your text</strong> and displays the converted result in real-time without any delay or loading time.</li>
      <li>
      <strong>Copy Converted Text</strong>: Click the copy button or manually select the transformed text and copy it to your clipboard for immediate use.</li>
      <li><strong>Paste to Destination</strong>: Insert your newly formatted text into your target document, email, social media post, or any other application.</li>
      </ol>
      <p>The <strong>case converter</strong> handles text of any length efficiently and preserves original spacing, punctuation marks, and special characters throughout the conversion process.</p>
    `
  },
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, paragraphs, and reading time with readability scores",
    category: "text",
    subcategory: "Text Transformation",
    icon: "FileText",
    status: "implemented",
    contentHtml: `
      <h2>What is Online Word Counter?</h2>
      <p><strong>Online Word Counter</strong> is a free and efficient digital tool designed to help writers, students, professionals, and content creators instantly calculate the number of words, characters, sentences, and paragraphs in their text. Whether you’re crafting an essay, social media caption, SEO article, or professional email, this tool ensures your writing stays within specific limits while maintaining clarity and conciseness.</p>
      <p>In today’s fast-paced digital environment, maintaining the right word count is crucial for readability, engagement, and compliance with platform restrictions. For example, search engines favor articles with optimal word lengths, and social media platforms have strict character caps. This is where an online word counter becomes invaluable—it saves time, boosts accuracy, and helps refine your writing process.</p>
      <p>Beyond simple word counting, modern tools offer deeper insights into text composition. They can highlight keyword frequency, estimate reading time, and detect repetition or imbalance in writing tone. This makes them indispensable for content strategists, copywriters, students, and even developers testing text-based UI components.</p>
      <p>Key benefits of using an online word counter include:</p>
      <ul>
      <li><strong>Instant results:</strong> Get real-time counts as you type or paste your text.</li>
      <li><strong>Improved productivity:</strong> Avoid manual counting or switching between apps.</li>
      <li><strong>Writing precision:</strong> Stay within required limits for essays, blogs, or ads.</li>
      <li><strong>SEO optimization:</strong> Monitor keyword density for better search rankings.</li>
      <li><strong>Error-free editing:</strong> Spot lengthy sentences or unnecessary filler words.</li>
      </ul>
      <p>In short, an online word counter empowers you to write smarter and more efficiently by providing instant,>How to Use Online Word Counter?</h2>
      <p>Using an online word counter is straightforward and requires no installation or login. You can start analyzing your text in seconds by following these simple steps:</p>
      <ol>
      <li><strong>Open the tool page</strong>: Navigate to the word counter page in your web browser.</li>
      <li><strong>Enter or paste text</strong>: Copy your content and paste it into the text box, or start typing directly into the editor</li>
      <li><strong>View live statistics</strong>: The tool will automatically update word, character, and sentence counts in real time as you type.
      </li>
      <li><strong>Edit and optimize</strong>: Make changes to your content while watching how the counts adjust dynamically.
      </li>
      <li><strong>Copy or download results (optional)</strong>: Once satisfied, you can copy your edited text or export it for further use.</li>
      </ol>
      <p>This intuitive process helps you stay focused on writing without the distraction of manual calculations or formatting tools.</p>
      <h2>What Statistics are Provided?</h2>
      <p>A robust online word counter provides comprehensive text analysis to give users a deeper understanding of their writing. The common statistics include:</p>
      <ul>
      <li><strong>Word Count:</strong> Total number of words in your text.</li>
      <li><strong>Character Count:</strong> Number of characters, with or without spaces.</li>
      <li><strong>Sentence Count:</strong> Identifies how many complete sentences are present.</li>
      <li><strong>Paragraph Count:</strong> Useful for checking structure and readability.</li>
      <li><strong>Reading Time Estimate:</strong> Calculates how long it would take an average reader to read the text.</li>
      <li><strong>Keyword Density:</strong> Shows how often specific words appear, aiding in SEO optimization.</li>
      <li><strong>Longest and Shortest Words:</strong> Highlights extremes in word length for stylistic balance.</li>
      </ul>
      <p>These insights allow you to fine-tune your content for clarity, engagement, and compliance—ensuring your writing performs effectively across academic, professional, and digital platforms.</p>
    `
  },
  {
    id: "text-diff",
    slug: "text-diff",
    name: "Text Diff Checker",
    description: "Compare two texts and highlight differences with side-by-side or inline view",
    category: "text",
    subcategory: "Text Transformation",
    icon: "GitCompare",
    status: "planned",
  },
  {
    id: "lorem-ipsum",
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text with custom paragraph and word count",
    category: "text",
    subcategory: "Text Transformation",
    icon: "Paragraph",
    status: "planned",
  },
  
  // String & List Utilities
  {
    id: "list-randomizer",
    slug: "list-randomizer",
    name: "List Randomizer",
    description: "Shuffle list items randomly with weighted randomization and multiple shuffle algorithms",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Shuffle",
    status: "planned",
  },
  {
    id: "list-to-csv",
    slug: "list-to-csv",
    name: "List to Comma Separated",
    description: "Convert list to CSV format with custom delimiters and quote wrapping",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "List",
    status: "planned",
  },
  {
    id: "csv-to-list",
    slug: "csv-to-list",
    name: "Comma to List",
    description: "Convert CSV to list format with auto-detect delimiter and quoted field handling",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "ListOrdered",
    status: "planned",
  },
  {
    id: "number-list-generator",
    slug: "number-list-generator",
    name: "Number List Generator",
    description: "Generate sequential or random numbers with arithmetic/geometric sequences",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Hash",
    status: "planned",
  },
  {
    id: "split-text",
    slug: "split-text",
    name: "Split Text",
    description: "Split text by delimiter or character count with regex splitting and equal chunks",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Scissors",
    status: "planned",
  },
  {
    id: "merge-lists",
    slug: "merge-lists",
    name: "Merge Lists",
    description: "Combine multiple lists with union, intersection, and difference operations",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Merge",
    status: "planned",
  },
  {
    id: "list-item-counter",
    slug: "list-item-counter",
    name: "List Item Counter",
    description: "Count unique items in a list with frequency analysis and visualization",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "ListPlus",
    status: "planned",
  },
  {
    id: "prefix-suffix-tool",
    slug: "prefix-suffix-tool",
    name: "Prefix/Suffix Tool",
    description: "Add text before or after each line with number sequences and conditional prefixes",
    category: "string-list",
    subcategory: "String & List Utilities",
    icon: "Plus",
    status: "planned",
  },
  
  // Encoding Tools
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings with support for images and files",
    category: "encoding",
    icon: "Binary",
    status: "implemented",
    isTrending: true,
    contentHtml: `
      <h2>What is Online Base64 Encoder/Decoder?</h2>
      <p><strong>Online Base64 Encoder/Decoder</strong> is a web-based utility that converts binary data into ASCII text format and vice versa using the Base64 encoding scheme. Base64 is a binary-to-text encoding method that represents binary data in an ASCII string format by translating it into a radix-64 representation. This encoding scheme uses 64 different ASCII characters (A-Z, a-z, 0-9, +, and /) to represent data, making it possible to transmit binary files through channels that only support text content.</p>
      <p>The encoding process works by taking three bytes of binary data (24 bits) and dividing them into four groups of six bits each. Each 6-bit group is then mapped to one of the 64 characters in the Base64 alphabet. This transformation increases the data size by approximately 33%, but ensures safe transmission across systems that might otherwise corrupt binary data.</p>
      <p>Base64 encoding is extensively used in various applications and protocols:</p>
      <ul>
      <li><strong>Email Attachments</strong>: MIME (Multipurpose Internet Mail Extensions) uses Base64 to encode file attachments for email transmission</li>
      <li><strong>Data URLs</strong>: Embedding images and other resources directly into HTML, CSS, or JSON files</li>
      <li><strong>Authentication</strong>: Encoding credentials in HTTP Basic Authentication headers</li>
      <li><strong>API Communication</strong>: Transmitting binary data like images or documents through JSON APIs</li>
      <li><strong>Certificates and Keys</strong>: Storing cryptographic keys and SSL/TLS certificates in PEM format</li>
      <li><strong>Web Development</strong>: Encoding data for safe inclusion in URLs or cookies</li>
      </ul>
      <p>Here's a simple encoding example:</p>
      <pre><span>Original Text: Hello World!</span><p>Base64 Encoded: SGVsbG8gV29ybGQh</p></pre>
      <p>When decoded, the Base64 string returns to its original form:</p>
      <pre><span>Base64 Encoded: SGVsbG8gV29ybGQh</span><p>Decoded Text: Hello World!</p></pre>
      <h2>Is Base64 encoding safe?</h2>
      <p>Base64 encoding is <strong>not a security mechanism</strong> and should never be used as a method of encryption or data protection. It is simply an encoding format designed for data representation and transport compatibility, not for confidentiality. Anyone with access to Base64-encoded data can easily decode it back to its original form using any decoder tool.</p>
      <p>Key security considerations:</p>
      <ul>
      <li><strong>Not encryption</strong>: Base64 provides zero cryptographic protection; it's reversible without any key or password</li>
      <li><strong>Obfuscation only</strong>: While it makes data unreadable at first glance, it offers no real security against intentional inspection</li>
      <li><strong>Increased data size</strong>: The 33% size increase can expose more data to potential interception</li>
      <li><strong>Should be combined with encryption</strong>: For sensitive data, use proper encryption (AES, RSA) before Base64 encoding</li>
      </ul>
      <p>However, Base64 is safe for its intended purposes: ensuring data integrity during transmission and making binary data compatible with text-based systems.</p>
      <h2>How to use Base64 Encoder/Decoder Tool?</h2>
      <p>Using an online Base64 encoder/decoder is straightforward:</p>
      <p><strong>Encoding Process:</strong></p>
      <ol>
      <li>Paste or type your text/data into the input field</li>
      <li>Click the "Encode" button</li>
      <li>Copy the Base64-encoded output for use in your application</li>
      </ol>
      <p><strong>Decoding Process:</strong></p>
      <ol>
      <li>Paste the Base64-encoded string into the input field</li>
      <li>Click the "Decode" button</li>
      <li>View and copy the decoded original content</li>
      </ol>
      <p><strong>Example workflow:</strong></p>
      <pre><span>Input: admin:password123</span>
<span>Encoded: YWRtaW46cGFzc3dvcmQxMjM=</span><br/>
<span>Input: YWRtaW46cGFzc3dvcmQxMjM=</span>
<span>Decoded: admin:password123</span></pre>
      <p>Most tools also support file encoding/decoding, allowing you to upload files directly and download the encoded or decoded results.</p>
    `
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URL strings for safe transmission",
    category: "encoding",
    icon: "Link",
    status: "planned",
  },
  {
    id: "html-entity",
    slug: "html-entity",
    name: "HTML Entity Encoder",
    description: "Convert HTML entities for safe display in web pages",
    category: "encoding",
    icon: "Code2",
    status: "planned",
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and validate JSON Web Tokens with signature verification",
    category: "encoding",
    icon: "Key",
    status: "planned",
  },
  {
    id: "qr-code",
    slug: "qr-code",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs with custom colors and sizes",
    category: "encoding",
    icon: "QrCode",
    status: "planned",
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256, SHA512 hashes from text",
    category: "encoding",
    icon: "Hash",
    status: "planned",
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate v1, v4, and v5 UUIDs with bulk generation support",
    category: "encoding",
    icon: "Fingerprint",
    status: "planned",
  },
  
  // JSON & Data Tools
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON with syntax highlighting",
    category: "json",
    icon: "Braces",
    status: "implemented",
    isTrending: true,
    contentHtml: `
      <h2>What is Online JSON Formatter?</h2>
<p><strong>Online JSON Formatter</strong> is a web-based utility that transforms unformatted or minified JSON (JavaScript Object Notation) data into a clean, readable, and properly indented structure. JSON is a lightweight>What does a JSON format look like?</h2>
<p>JSON format consists of key-value pairs organized in a hierarchical structure using objects and arrays. A properly formatted JSON document uses specific syntax rules and displays data in a human-readable layout with consistent indentation.</p>
<p><strong>Unformatted JSON example:</strong></p>
<pre><span class="code-comment"># Unformatted JSON code</span>
<span>{"name":"John Doe","age":30,"email":"john.doe@example.com","address":{"street":"123 Main St","city":"New York","zipcode":"10001"},"hobbies":["reading","gaming","traveling"],"active":true}</span></pre>
<p><strong>Formatted JSON example:</strong></p>
<pre><span class="code-comment"># Formatted JSON code</span>
<span>{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipcode": "10001"
  },
  "hobbies": [
    "reading",
    "gaming",
    "traveling"
  ],
  "active": true
}</span></pre>
<p>The formatted version clearly shows the data structure with proper indentation, making nested objects and arrays easily identifiable.</p>
<h2 id="how-to-use-json-formatter-tool">How to use JSON Formatter Tool?</h2>
<p>Using an online JSON formatter is a simple and efficient process:</p>
<p><strong>Formatting Process:</strong></p>
<ol>
<li>Copy your unformatted or minified JSON data</li>
<li>Paste it into the input text area</li>
<li>Click the "Format" or "Beautify" button</li>
<li>Review the properly formatted output with syntax highlighting</li>
<li>Copy the formatted JSON for use in your project</li>
</ol>
<p><strong>Validation Process:</strong></p>
<ol>
<li>Paste your JSON data into the tool</li>
<li>The tool automatically validates syntax</li>
<li>Error messages appear if invalid syntax is detected</li>
<li>Fix errors based on the provided guidance</li>
</ol>
<p><strong>Example workflow:</strong></p>
<pre>
<span>Input: {"product":"Laptop","price":999,"inStock":true}</span>

<span class="code-comment">Formatted Output:</span>
{
  "product": "Laptop",
  "price": 999,
  "inStock": true
}
</pre>
<p>Additional features often include options to minify JSON, download formatted files, or switch between different view modes for optimal data examination.</p>
    `
  },
  {
    id: "json-to-csv",
    slug: "json-to-csv",
    name: "JSON to CSV",
    description: "Convert JSON data to CSV format with custom delimiters",
    category: "json",
    icon: "FileJson",
    status: "planned",
  },
  {
    id: "csv-to-json",
    slug: "csv-to-json",
    name: "CSV to JSON",
    description: "Convert CSV data to JSON format with auto type detection",
    category: "json",
    icon: "Table",
    status: "planned",
  },
  
  // Code Tools
  {
    id: "code-formatter",
    slug: "code-formatter",
    name: "Code Formatter",
    description: "Format HTML, CSS, JavaScript, and JSON code with multiple style guides",
    category: "code",
    icon: "Code",
    status: "planned",
  },
  {
    id: "code-minifier",
    slug: "code-minifier",
    name: "Code Minifier",
    description: "Minify JavaScript, CSS, and HTML to reduce file size",
    category: "code",
    icon: "FileCode",
    status: "planned",
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions with highlighting and explanations",
    category: "code",
    icon: "Search",
    status: "planned",
  },
  {
    id: "color-picker",
    slug: "color-picker",
    name: "Color Picker",
    description: "Pick and convert colors between HEX, RGB, HSL, and CMYK",
    category: "code",
    icon: "Palette",
    status: "planned",
  },
  
  // SEO Tools
  {
    id: "meta-tag-generator",
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate HTML meta tags for SEO and social media",
    category: "seo",
    icon: "Tags",
    status: "planned",
  },
  {
    id: "slug-generator",
    slug: "slug-generator",
    name: "URL Slug Generator",
    description: "Generate SEO-friendly URL slugs from titles",
    category: "seo",
    icon: "Link2",
    status: "planned",
  },
];

/**
 * Category information
 */
export const categories: CategoryInfo[] = [
  {
    id: "text",
    name: "Text Tools",
    description: "Transform, analyze, and manipulate text",
    longDescription: "Looking for powerful online text tools? Look no further than Stack Online Tools! Our comprehensive text tools collection is the best on the web and they're all completely free.\n\nWhether you're looking for case conversion, word counting, text formatting, or advanced text manipulation, we've got you covered. Transform your text with our case converter, analyze content with our word counter, and enhance your writing workflow with our professional-grade text utilities. All tools work instantly in your browser with no downloads required.",
    icon: "Type",
    toolCount: toolsMetadata.filter((t) => t.category === "text" && t.status === "implemented").length,
  },
  {
    id: "string-list",
    name: "String & List Utilities",
    description: "Manipulate lists, strings, and data structures",
    longDescription: "Need to work with lists and strings efficiently? Our string and list utilities are the perfect solution for developers, data analysts, and content creators. From randomizing lists and converting between formats to splitting text and merging data structures, our tools handle all your string manipulation needs.\n\nGenerate number sequences, count list items, add prefixes and suffixes, or convert between CSV and list formats with ease. All our string tools are free, fast, and work directly in your browser without any installation required.",
    icon: "List",
    toolCount: toolsMetadata.filter((t) => t.category === "string-list" && t.status === "implemented").length,
  },
  {
    id: "encoding",
    name: "Encoding & Decoding",
    description: "Encode, decode, and hash data",
    longDescription: "Secure your data with our professional encoding and decoding tools! Whether you need Base64 encoding for file transfers, URL encoding for web development, or hash generation for security purposes, our encoding tools have you covered.\n\nGenerate QR codes, decode JWT tokens, create UUIDs, and hash your data with MD5, SHA1, SHA256, and SHA512 algorithms. Our encoding utilities are trusted by developers worldwide and work seamlessly in your browser. All tools are free and require no registration or downloads.",
    icon: "Binary",
    toolCount: toolsMetadata.filter((t) => t.category === "encoding" && t.status === "implemented").length,
  },
  {
    id: "json",
    name: "JSON & Data",
    description: "Format, convert, and validate data",
    longDescription: "Working with JSON and data formats? Our JSON tools make data manipulation effortless! Format and validate JSON with syntax highlighting, convert between JSON and CSV formats, and handle complex data transformations with ease.\n\nWhether you're a developer working with APIs, a data analyst processing information, or a content creator managing structured data, our JSON utilities provide professional-grade functionality. All tools are free, work instantly in your browser, and support large datasets without compromising performance.",
    icon: "Braces",
    toolCount: toolsMetadata.filter((t) => t.category === "json" && t.status === "implemented").length,
  },
  {
    id: "code",
    name: "Code & Developer",
    description: "Format, minify, and test code",
    longDescription: "Boost your development productivity with our comprehensive code tools! Format HTML, CSS, JavaScript, and other programming languages with multiple style guides. Minify your code to reduce file sizes and improve performance.\n\nTest regular expressions with real-time highlighting and explanations. Pick and convert colors between HEX, RGB, HSL, and CMYK formats. Our developer tools are designed by programmers for programmers, offering professional-grade functionality that integrates seamlessly into your workflow. All tools are free and work directly in your browser.",
    icon: "Code",
    toolCount: toolsMetadata.filter((t) => t.category === "code" && t.status === "implemented").length,
  },
  {
    id: "seo",
    name: "SEO & Marketing",
    description: "Optimize content for search engines",
    longDescription: "Optimize your website's search engine performance with our powerful SEO tools! Generate comprehensive meta tags for better social media sharing and search engine visibility. Create SEO-friendly URL slugs that improve your site's ranking potential.\n\nOur SEO utilities help you optimize titles, descriptions, and keywords for maximum search engine impact. Whether you're a blogger, marketer, or business owner, our tools provide the insights you need to boost your online presence. All SEO tools are free, easy to use, and work instantly in your browser.",
    icon: "TrendingUp",
    toolCount: toolsMetadata.filter((t) => t.category === "seo" && t.status === "implemented").length,
  },
  {
    id: "markdown",
    name: "Markdown",
    description: "Edit and convert Markdown",
    longDescription: "Create beautiful documents with our Markdown editing and conversion tools! Whether you're writing documentation, blog posts, or technical content, our Markdown utilities make formatting effortless. Convert Markdown to HTML, preview your content in real-time, and export to various formats.\n\nOur tools support all Markdown features including tables, code blocks, links, and custom styling. Perfect for developers, writers, and content creators who need reliable Markdown processing. All tools are free and work seamlessly in your browser without any setup required.",
    icon: "FileText",
    toolCount: 0,
  },
  {
    id: "image",
    name: "Image Tools",
    description: "Process and convert images",
    longDescription: "Transform your images with our comprehensive image processing tools! Resize, crop, compress, and convert images between different formats including JPEG, PNG, WebP, and more. Generate thumbnails, add watermarks, and optimize images for web performance.\n\nOur image tools support batch processing, maintain quality while reducing file sizes, and work with high-resolution photos.Whether you're a web developer optimizing assets, a designer processing graphics, or a content creator managing media files, our tools provide professional-grade functionality. All image processing is done securely in your browser.",
    icon: "Image",
    toolCount: 0,
  },
  {
    id: "pdf",
    name: "PDF Tools",
    description: "Manipulate PDF documents",
    longDescription: "Handle PDF documents efficiently with our powerful PDF manipulation tools! Merge multiple PDFs into one document, split large PDFs into smaller files, and extract specific pages. Convert PDFs to images, compress PDF files to reduce size, and add watermarks or annotations.\n\nOur PDF tools support password-protected files, maintain document quality, and work with files of any size. Perfect for businesses, students, and professionals who regularly work with PDF documents. All tools are free, secure, and process files directly in your browser without uploading to servers.",
    icon: "FileType",
    toolCount: 0,
  },
  {
    id: "math",
    name: "Math & Calculation",
    description: "Calculate and convert units",
    longDescription: "Solve mathematical problems and convert units with our comprehensive math tools! Perform complex calculations, convert between different unit systems, and solve equations with step-by-step solutions. Our math utilities support basic arithmetic, algebra, geometry, and advanced mathematical functions.\n\nConvert currencies, measurements, temperatures, and more with real-time exchange rates and accurate conversion factors. Whether you're a student, engineer, scientist, or professional, our math tools provide reliable calculations and conversions. All tools are free and work instantly in your browser.",
    icon: "Calculator",
    toolCount: 0,
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    description: "Generate passwords and secure data",
    longDescription: "Protect your digital life with our advanced privacy and security tools! Generate strong, secure passwords with customizable length and character sets. Create secure random numbers, encrypt sensitive data, and generate secure tokens for authentication.\n\nOur privacy tools help you maintain online security with features like password strength analysis, secure data wiping, and privacy-focused utilities. Whether you're securing personal accounts, protecting business data, or maintaining online privacy, our tools provide enterprise-grade security features. All tools are free and process data locally in your browser.",
    icon: "Shield",
    toolCount: 0,
  },
  {
    id: "misc",
    name: "Miscellaneous",
    description: "Other useful utilities",
    longDescription: "Discover a collection of unique and useful utilities that don't fit into other categories! From time zone converters and QR code generators to barcode creators and random generators, our miscellaneous tools cover a wide range of everyday needs.\n\nGenerate random data for testing, convert between different formats, and access specialized utilities for specific tasks. Our miscellaneous collection is constantly growing with new tools based on user feedback and emerging needs. All utilities are free, easy to use, and work directly in your browser without any installation or registration required.",
    icon: "Grid3x3",
    toolCount: 0,
  },
];

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return toolsMetadata.find((tool) => tool.slug === slug);
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: ToolCategory): ToolMetadata[] {
  return toolsMetadata.filter((tool) => tool.category === category);
}

/**
 * Get implemented tools by category
 */
export function getImplementedToolsByCategory(category: ToolCategory): ToolMetadata[] {
  return toolsMetadata.filter((tool) => tool.category === category && tool.status === "implemented");
}

/**
 * Get trending tools
 */
export function getTrendingTools(): ToolMetadata[] {
  return toolsMetadata.filter((tool) => tool.isTrending && tool.status === "implemented");
}

/**
 * Search tools by query
 */
export function searchTools(query: string): ToolMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return toolsMetadata.filter(
    (tool) =>
      tool.status === "implemented" &&
      (tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery))
  );
}

