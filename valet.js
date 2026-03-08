// Laravel Valet
const PACKAGES = [
  {
    id:'valet', name:'Laravel Valet', icon:'🌿', theme:'theme-green',
    subtitle:'laravel/valet', category:'Development',
    desc:'macOS Development Environment خفيف — Sites بدون Docker أو Virtual Machines.',
    tags:['macOS','Development','Local','Nginx'],
    tutorial: {
      sections: [
        { title:'ما هو Valet؟', content:`<p class="tut-p">Valet هو Development Environment لـ macOS. بيشغل Nginx وـ PHP مباشرة بدون Docker. أسرع من Sail لكن macOS فقط.</p><div class="alert alert-info"><div class="alert-icon">ℹ️</div><div>للـ Windows والـ Linux، استخدم <strong>Herd</strong> أو <strong>Sail</strong> بدلاً من Valet.</div></div>` },
        { title:'التثبيت', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">brew install php
composer global require laravel/valet
valet install

<span class="cm"># تسجيل مجلد Sites</span>
cd ~/Sites
valet park

<span class="cm"># أي مجلد جوا ~/Sites يبقى accessible تلقائياً</span>
<span class="cm"># myapp → http://myapp.test</span></pre></div>` },
        { title:'الأوامر الأساسية', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># تفعيل HTTPS</span>
valet secure myapp
valet unsecure myapp

<span class="cm"># مشاركة عبر الإنترنت (Ngrok)</span>
valet share

<span class="cm"># تغيير PHP Version لـ Site معين</span>
valet isolate php@8.1
valet unisolate

<span class="cm"># تغيير PHP Version لكل Sites</span>
valet use php@8.2

<span class="cm"># عرض كل الـ Sites</span>
valet links

<span class="cm"># فتح Site في المتصفح</span>
valet open myapp</pre></div>` },
        { title:'Valet Drivers — دعم Frameworks أخرى', content:`<p class="tut-p">Valet بيدعم Laravel، Statamic، Symfony، WordPress وغيرها تلقائياً. تقدر تضيف Framework جديد بـ Custom Driver.</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">~/.config/valet/Drivers/WordPressValetDriver.php</span></div><pre class="code"><span class="kw">class</span> <span class="cls">WordPressValetDriver</span> <span class="kw">extends</span> <span class="cls">ValetDriver</span>
{
    <span class="kw">public function</span> <span class="fn">serves</span>(<span class="kw">string</span> <span class="var">$sitePath</span>, <span class="kw">string</span> <span class="var">$siteName</span>, <span class="kw">string</span> <span class="var">$uri</span>): <span class="kw">bool</span>
    {
        <span class="kw">return</span> <span class="fn">file_exists</span>(<span class="var">$sitePath</span> . <span class="str">'/wp-config.php'</span>);
    }

    <span class="kw">public function</span> <span class="fn">frontControllerPath</span>(<span class="kw">string</span> <span class="var">$sitePath</span>, ...): <span class="kw">string</span>
    {
        <span class="kw">return</span> <span class="var">$sitePath</span> . <span class="str">'/index.php'</span>;
    }
}</pre></div>` },
        { title:'Database وـ Mail في Valet', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># تثبيت DBngin أو TablePlus مع Valet</span>
brew install --cask tableplus

<span class="cm"># الـ Database عبر MySQL/PostgreSQL native</span>
<span class="cm"># استخدم DBngin لإدارة الـ Services</span>

<span class="cm"># Mail Testing بـ Mailpit</span>
brew install mailpit
mailpit
<span class="cm"># الـ Inbox: http://localhost:8025</span></pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">env</span><span class="code-file">.env</span></div><pre class="code">MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025  <span class="cm"># Mailpit SMTP port</span></pre></div>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما الفرق بين Sail وـ Valet؟', a:`<table class="compare-table"><tr><th>Sail</th><th>Valet</th></tr><tr><td>Docker-based — كل حاجة في containers</td><td>Native macOS — مباشرة على الـ OS</td></tr><tr><td>Windows/Mac/Linux</td><td>macOS فقط</td></tr><tr><td>Isolated environment</td><td>Shared PHP installation</td></tr><tr><td>أثقل في الموارد</td><td>أخف وأسرع بكتير</td></tr><tr><td>يحتاج Docker Desktop</td><td>يحتاج Homebrew فقط</td></tr></table>` },
      { level:'easy', q:'إزاي بتضيف Site جديد في Valet؟', a:`<p>طريقتين:</p><ol><li><strong>Park</strong> — تسجيل مجلد بأكمله، كل sub-folder بيبقى Site:<br><code>cd ~/Sites && valet park</code></li><li><strong>Link</strong> — تسجيل مجلد محدد:<br><code>cd ~/myproject && valet link my-project</code></li></ol><p>بعدها تفتح <code>http://my-project.test</code> مباشرة.</p>` },
      { level:'medium', q:'إزاي بتعمل PHP Version Isolation لـ Site معين في Valet؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># PHP 8.1 لـ مشروع قديم</span>
cd ~/Sites/legacy-project
valet isolate php@8.1

<span class="cm"># PHP 8.3 لـ مشروع آخر</span>
cd ~/Sites/new-project
valet isolate php@8.3

<span class="cm"># إزالة الـ Isolation</span>
valet unisolate</pre></div><p>كل Site ممكن يشتغل على PHP Version مختلف في نفس الوقت!</p>` },
      { level:'medium', q:'إزاي بتضيف Custom Driver في Valet؟', a:`<p>تقدر تضيف support لـ Frameworks غير المدعومة:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">~/.config/valet/Drivers/MyFrameworkValetDriver.php</span></div><pre class="code"><span class="kw">class</span> <span class="cls">MyFrameworkValetDriver</span> <span class="kw">extends</span> <span class="cls">ValetDriver</span>
{
    <span class="kw">public function</span> <span class="fn">serves</span>(<span class="kw">string</span> <span class="var">$sitePath</span>, <span class="kw">string</span> <span class="var">$siteName</span>, <span class="kw">string</span> <span class="var">$uri</span>): <span class="kw">bool</span>
    {
        <span class="kw">return</span> <span class="fn">file_exists</span>(<span class="var">$sitePath</span> . <span class="str">'/my-framework.json'</span>);
    }
}</pre></div>` },
      { level:'hard', q:'إزاي بتعمل HTTPS Local Development في Valet؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># تفعيل TLS Certificate</span>
valet secure myapp
<span class="cm"># الآن: https://myapp.test</span>

<span class="cm"># Valet بيولد Certificate باستخدام mkcert</span>
<span class="cm"># Certificate بيتثبت تلقائياً في macOS Keychain</span>

<span class="cm"># تأكد إن APP_URL محدث</span></pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">env</span></div><pre class="code">APP_URL=https://myapp.test
SESSION_SECURE_COOKIE=true</pre></div>` },
    ]
  }
];
