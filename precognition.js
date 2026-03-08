// Laravel Precognition
const PACKAGES = [
  {
    id:'precognition', name:'Laravel Precognition', icon:'🔮', theme:'theme-purple',
    subtitle:'laravel/precognition', category:'Forms & Validation',
    desc:'Real-time Form Validation — اعرض أخطاء الـ Validation قبل الـ Submit.',
    tags:['Validation','Forms','UX','Real-time'],
    tutorial: {
      sections: [
        { title:'ما هو Precognition؟', content:`<p class="tut-p">Precognition بيوفر Real-time Validation — الـ Form بيتحقق من صحة البيانات على الـ Server عند كل keystroke بدون Submit.</p>` },
        { title:'الإعداد في Laravel', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">routes/web.php</span></div><pre class="code"><span class="cm">// نفس الـ Route بيشتغل للـ Precognition والـ Submit</span>
<span class="cls">Route</span>::<span class="fn">post</span>(<span class="str">'/users'</span>, <span class="cls">UserController</span>::<span class="kw">class</span>);

<span class="cm">// في الـ Controller</span>
<span class="kw">public function</span> <span class="fn">store</span>(<span class="cls">StoreUserRequest</span> <span class="var">$request</span>)
{
    <span class="cm">// Precognition بيرن الـ Validation تلقائياً</span>
    <span class="cls">User</span>::<span class="fn">create</span>(<span class="var">$request</span>-><span class="fn">validated</span>());
}</pre></div>` },
        { title:'في Frontend مع Vue', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">npm install laravel-precognition-vue</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">javascript</span><span class="code-file">CreateUser.vue</span></div><pre class="code"><span class="kw">import</span> { <span class="fn">useForm</span> } <span class="kw">from</span> <span class="str">'laravel-precognition-vue'</span>;

<span class="kw">const</span> form = <span class="fn">useForm</span>(<span class="str">'post'</span>, <span class="str">'/users'</span>, {
    name:  <span class="str">''</span>,
    email: <span class="str">''</span>,
});

<span class="cm">// Real-time validation عند كل تغيير</span>
<span class="kw">const</span> <span class="fn">validateName</span> = () => form.<span class="fn">validate</span>(<span class="str">'name'</span>);</pre></div>` },
        { title:'مع React', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">npm install laravel-precognition-react</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">javascript</span><span class="code-file">CreateUser.jsx</span></div><pre class="code"><span class="kw">import</span> { <span class="fn">useForm</span> } <span class="kw">from</span> <span class="str">'laravel-precognition-react'</span>;

<span class="kw">const</span> { data, setData, submit, validating, errors } = <span class="fn">useForm</span>(<span class="str">'post'</span>, <span class="str">'/users'</span>, {
    name: <span class="str">''</span>,
    email: <span class="str">''</span>,
});

<span class="kw">return</span> (
    &lt;form onSubmit={submit}&gt;
        &lt;input
            value={data.name}
            onChange={e => setData(<span class="str">'name'</span>, e.target.value)}
            onBlur={() => form.<span class="fn">validate</span>(<span class="str">'name'</span>)}
        /&gt;
        {errors.name &amp;&amp; &lt;p className="error"&gt;{errors.name}&lt;/p&gt;}
    &lt;/form&gt;
);</pre></div>` },
        { title:'Debouncing وـ Performance', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">javascript</span></div><pre class="code"><span class="cm">// في Vue — Debounce Validation</span>
<span class="kw">const</span> form = <span class="fn">useForm</span>(<span class="str">'post'</span>, <span class="str">'/users'</span>, {
    email: <span class="str">''</span>,
});

<span class="cm">// Validate بعد 500ms من التوقف</span>
<span class="kw">const</span> <span class="fn">validateEmail</span> = () => form.<span class="fn">validate</span>(<span class="str">'email'</span>);

<span class="cm">// في الـ Template</span>
// &lt;input @input.debounce.500ms="validateEmail" /&gt;</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">StoreUserRequest.php</span></div><pre class="code"><span class="cm">// تحديد الـ Fields اللي بيشتغل معاها Precognition</span>
<span class="kw">public function</span> <span class="fn">rules</span>(): <span class="kw">array</span>
{
    <span class="kw">return</span> <span class="cls">Request</span>::<span class="fn">isPrecognitive</span>()
        ? <span class="cls">Arr</span>::<span class="fn">only</span>(<span class="var">$this</span>-><span class="fn">baseRules</span>(), <span class="var">$this</span>-><span class="fn">headers</span>()-><span class="fn">get</span>(<span class="str">'Precognition-Validate-Only'</span>))
        : <span class="var">$this</span>-><span class="fn">baseRules</span>();
}</pre></div>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Precognition وكيف يحسن UX؟', a:`<p>Precognition بيتحقق من الـ Form Server-side في Real-time — الـ Server Validation نفسها بدون Submit:</p><ul><li>Instant feedback على كل Field</li><li>بدون انتظار الـ Form Submit</li><li>نفس الـ Validation Rules بالضبط</li><li>لا تكرار للـ Rules في الـ Frontend</li></ul>` },
      { level:'easy', q:'إيه الـ Frameworks اللي يدعمها Precognition؟', a:`<ul><li>Vue.js — <code>laravel-precognition-vue</code></li><li>React — <code>laravel-precognition-react</code></li><li>Alpine.js — <code>laravel-precognition-alpine</code></li><li>Inertia + Vue — <code>laravel-precognition-vue-inertia</code></li><li>Inertia + React — <code>laravel-precognition-react-inertia</code></li></ul>` },
      { level:'medium', q:'إزاي Precognition بيشتغل خلف الكواليس؟', a:`<p>عند Validation Request، Precognition بيبعت نفس الـ Request بـ Header خاص:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">text</span></div><pre class="code">Precognition: true
Precognition-Validate-Only: name,email</pre></div><p>Laravel بيشوف الـ Header ده ويعدّل الـ Request Lifecycle — بيشتغل الـ Validation فقط بدون تنفيذ الـ Action، وبيرجع JSON بالـ Errors.</p>` },
      { level:'medium', q:'إزاي بتعمل Validation لـ Field واحد بس؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">javascript</span></div><pre class="code"><span class="kw">const</span> form = <span class="fn">useForm</span>(<span class="str">'post'</span>, <span class="str">'/register'</span>, {
    name: <span class="str">''</span>, email: <span class="str">''</span>, password: <span class="str">''</span>,
});

<span class="cm">// Validate فقط الـ email عند blur</span>
form.<span class="fn">validate</span>(<span class="str">'email'</span>);

<span class="cm">// أو عدة fields في نفس الوقت</span>
form.<span class="fn">validate</span>([<span class="str">'name'</span>, <span class="str">'email'</span>]);</pre></div>` },
    ]
  },

  // ==================== ENVOY ====================
];
