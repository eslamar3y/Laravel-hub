// Laravel Scout
const PACKAGES = [
  {
    id:'scout', name:'Laravel Scout', icon:'🔍', theme:'theme-blue',
    subtitle:'laravel/scout', category:'Search',
    desc:'Full-text Search لـ Eloquent Models — Algolia، Meilisearch، Typesense، Database.',
    tags:['Search','Algolia','Meilisearch','Fulltext'],
    tutorial: {
      sections: [
        { title:'ما هو Scout؟', content:`<p class="tut-p">Scout بيضيف Full-text search لـ Eloquent Models بسهولة. بيدعم Algolia، Meilisearch، Typesense، وـ Database Driver.</p>` },
        { title:'التثبيت والإعداد', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/scout
<span class="cm"># لـ Meilisearch</span>
composer require meilisearch/meilisearch-php http-interop/http-factory-guzzle
php artisan vendor:publish --provider="Laravel\\Scout\\ScoutServiceProvider"</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">env</span></div><pre class="code">SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_KEY=masterKey</pre></div>` },
        { title:'Searchable Trait', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">Post.php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Scout\\Searchable</span>;

<span class="kw">class</span> <span class="cls">Post</span> <span class="kw">extends</span> <span class="cls">Model</span>
{
    <span class="kw">use</span> Searchable;

    <span class="cm">// تحديد الـ Fields القابلة للبحث</span>
    <span class="kw">public function</span> <span class="fn">toSearchableArray</span>()
    {
        <span class="kw">return</span> [
            <span class="str">'id'</span>      => <span class="var">$this</span>->id,
            <span class="str">'title'</span>   => <span class="var">$this</span>->title,
            <span class="str">'content'</span> => <span class="var">$this</span>->content,
            <span class="str">'tags'</span>    => <span class="var">$this</span>->tags->pluck(<span class="str">'name'</span>)->join(<span class="str">' '</span>),
        ];
    }
}

<span class="cm">// البحث</span>
<span class="cls">Post</span>::<span class="fn">search</span>(<span class="str">'laravel tutorial'</span>)->get();
<span class="cls">Post</span>::<span class="fn">search</span>(<span class="str">'laravel'</span>)->where(<span class="str">'user_id'</span>, <span class="num">1</span>)->paginate(<span class="num">10</span>);</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Scout وما الـ Drivers اللي بيدعمها؟', a:`<p>Scout بيضيف full-text search لـ Eloquent. الـ Drivers:</p><ul><li><strong>Algolia</strong> — خدمة سحابية سريعة</li><li><strong>Meilisearch</strong> — open-source، self-hosted</li><li><strong>Typesense</strong> — سريع جداً</li><li><strong>Database</strong> — للمشاريع الصغيرة بدون خدمة خارجية</li></ul>` },
      { level:'medium', q:'إزاي بتعمل Custom Search Index وتتحكم في الـ Fields المفهرسة؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">public function</span> <span class="fn">toSearchableArray</span>()
{
    <span class="var">$array</span> = <span class="var">$this</span>-><span class="fn">toArray</span>();
    <span class="cm">// حذف الـ Fields الحساسة</span>
    <span class="kw">unset</span>(<span class="var">$array</span>[<span class="str">'password'</span>], <span class="var">$array</span>[<span class="str">'email'</span>]);
    <span class="kw">return</span> <span class="var">$array</span>;
}

<span class="cm">// اسم الـ Index</span>
<span class="kw">public function</span> <span class="fn">searchableAs</span>()
{
    <span class="kw">return</span> <span class="str">'posts_index'</span>;
}</pre></div>` },
      { level:'hard', q:'إزاي بتعمل Chunk Import للـ Records الكتيرة؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># فهرسة كل الـ Records الموجودة</span>
php artisan scout:import "App\\Models\\Post"

<span class="cm"># حذف الـ Index</span>
php artisan scout:flush "App\\Models\\Post"</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// في الكود — Lazy import</span>
<span class="cls">Post</span>::<span class="fn">makeAllSearchable</span>();
<span class="cls">Post</span>::<span class="fn">makeAllSearchableUsing</span>(<span class="kw">fn</span>(<span class="var">$q</span>) => <span class="var">$q</span>-><span class="fn">with</span>(<span class="str">'category'</span>));</pre></div>` },
    ]
  },

  // ==================== PASSPORT ====================
];
