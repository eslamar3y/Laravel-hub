// Laravel Filament
const PACKAGES = [
  {
    id:'filament', name:'Laravel Filament', icon:'🔶', theme:'theme-amber',
    subtitle:'filament/filament', category:'Admin Panel',
    desc:'Admin Panel كامل فوق Laravel — Resources، Forms، Tables، Widgets بكود بسيط.',
    tags:['Admin','TALL Stack','UI','Livewire'],
    tutorial: {
      sections: [
        { title:'ما هو Filament؟', content:`<p class="tut-p">Filament هو Admin Panel مبني على TALL Stack (Tailwind، Alpine.js، Livewire، Laravel). بيوفر CRUD كامل في دقائق.</p><div class="feat-grid"><div class="feat-item"><div class="feat-emoji">📦</div><div class="feat-t">Resources</div><div class="feat-d">CRUD كامل لأي Model</div></div><div class="feat-item"><div class="feat-emoji">📝</div><div class="feat-t">Forms</div><div class="feat-d">50+ حقل جاهز</div></div><div class="feat-item"><div class="feat-emoji">📊</div><div class="feat-t">Tables</div><div class="feat-d">Filtering، Sorting، Actions</div></div><div class="feat-item"><div class="feat-emoji">📈</div><div class="feat-t">Widgets</div><div class="feat-d">Stats، Charts، Tables</div></div></div>` },
        { title:'التثبيت', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require filament/filament:"^3.0" -W
php artisan filament:install --panels
php artisan make:filament-user</pre></div>` },
        { title:'إنشاء Resource كامل', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan make:filament-resource Post --generate</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">PostResource.php</span></div><pre class="code"><span class="kw">public static function</span> <span class="fn">form</span>(<span class="cls">Form</span> <span class="var">$form</span>): <span class="cls">Form</span>
{
    <span class="kw">return</span> <span class="var">$form</span>-><span class="fn">schema</span>([
        <span class="cls">Section</span>::<span class="fn">make</span>(<span class="str">'معلومات المنشور'</span>)-><span class="fn">schema</span>([
            <span class="cls">TextInput</span>::<span class="fn">make</span>(<span class="str">'title'</span>)-><span class="fn">required</span>()-><span class="fn">maxLength</span>(<span class="num">255</span>)-><span class="fn">columnSpanFull</span>(),
            <span class="cls">RichEditor</span>::<span class="fn">make</span>(<span class="str">'content'</span>)-><span class="fn">required</span>()-><span class="fn">columnSpanFull</span>(),
            <span class="cls">Select</span>::<span class="fn">make</span>(<span class="str">'category_id'</span>)-><span class="fn">relationship</span>(<span class="str">'category'</span>, <span class="str">'name'</span>)-><span class="fn">searchable</span>()-><span class="fn">preload</span>(),
            <span class="cls">TagsInput</span>::<span class="fn">make</span>(<span class="str">'tags'</span>),
        ])-><span class="fn">columns</span>(<span class="num">2</span>),
        <span class="cls">Section</span>::<span class="fn">make</span>(<span class="str">'الإعدادات'</span>)-><span class="fn">schema</span>([
            <span class="cls">Toggle</span>::<span class="fn">make</span>(<span class="str">'is_published'</span>)-><span class="fn">label</span>(<span class="str">'منشور؟'</span>),
            <span class="cls">DateTimePicker</span>::<span class="fn">make</span>(<span class="str">'published_at'</span>)-><span class="fn">label</span>(<span class="str">'تاريخ النشر'</span>),
            <span class="cls">FileUpload</span>::<span class="fn">make</span>(<span class="str">'cover_image'</span>)-><span class="fn">image</span>()-><span class="fn">directory</span>(<span class="str">'posts'</span>),
        ]),
    ]);
}

<span class="kw">public static function</span> <span class="fn">table</span>(<span class="cls">Table</span> <span class="var">$table</span>): <span class="cls">Table</span>
{
    <span class="kw">return</span> <span class="var">$table</span>
        -><span class="fn">columns</span>([
            <span class="cls">ImageColumn</span>::<span class="fn">make</span>(<span class="str">'cover_image'</span>)-><span class="fn">circular</span>(),
            <span class="cls">TextColumn</span>::<span class="fn">make</span>(<span class="str">'title'</span>)-><span class="fn">searchable</span>()-><span class="fn">sortable</span>(),
            <span class="cls">TextColumn</span>::<span class="fn">make</span>(<span class="str">'category.name'</span>)-><span class="fn">badge</span>()-><span class="fn">color</span>(<span class="str">'success'</span>),
            <span class="cls">IconColumn</span>::<span class="fn">make</span>(<span class="str">'is_published'</span>)-><span class="fn">boolean</span>(),
            <span class="cls">TextColumn</span>::<span class="fn">make</span>(<span class="str">'published_at'</span>)-><span class="fn">dateTime</span>()-><span class="fn">sortable</span>(),
        ])
        -><span class="fn">filters</span>([
            <span class="cls">SelectFilter</span>::<span class="fn">make</span>(<span class="str">'category'</span>)-><span class="fn">relationship</span>(<span class="str">'category'</span>, <span class="str">'name'</span>),
            <span class="cls">TernaryFilter</span>::<span class="fn">make</span>(<span class="str">'is_published'</span>),
        ])
        -><span class="fn">actions</span>([
            <span class="cls">Tables\Actions\EditAction</span>::<span class="fn">make</span>(),
            <span class="cls">Tables\Actions\DeleteAction</span>::<span class="fn">make</span>(),
        ])
        -><span class="fn">bulkActions</span>([
            <span class="cls">Tables\Actions\BulkActionGroup</span>::<span class="fn">make</span>([
                <span class="cls">Tables\Actions\DeleteBulkAction</span>::<span class="fn">make</span>(),
            ]),
        ]);
}</pre></div>` },
        { title:'Widgets — إحصائيات وـ Charts', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan make:filament-widget StatsOverview --stats-overview
php artisan make:filament-widget RevenueChart   --chart</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">StatsOverviewWidget.php</span></div><pre class="code"><span class="kw">class</span> <span class="cls">StatsOverview</span> <span class="kw">extends</span> <span class="cls">BaseWidget</span>
{
    <span class="kw">protected function</span> <span class="fn">getStats</span>(): <span class="kw">array</span>
    {
        <span class="kw">return</span> [
            <span class="cls">Stat</span>::<span class="fn">make</span>(<span class="str">'إجمالي المستخدمين'</span>, <span class="cls">User</span>::<span class="fn">count</span>())
                -><span class="fn">description</span>(<span class="str">'زيادة 12% هذا الشهر'</span>)
                -><span class="fn">descriptionIcon</span>(<span class="str">'heroicon-m-arrow-trending-up'</span>)
                -><span class="fn">color</span>(<span class="str">'success'</span>),
            <span class="cls">Stat</span>::<span class="fn">make</span>(<span class="str">'الإيرادات'</span>, <span class="str">'$'</span> . <span class="fn">number_format</span>(<span class="cls">Order</span>::<span class="fn">sum</span>(<span class="str">'total'</span>)))
                -><span class="fn">chart</span>([<span class="num">7</span>, <span class="num">2</span>, <span class="num">10</span>, <span class="num">3</span>, <span class="num">15</span>, <span class="num">4</span>, <span class="num">17</span>])
                -><span class="fn">color</span>(<span class="str">'warning'</span>),
            <span class="cls">Stat</span>::<span class="fn">make</span>(<span class="str">'الطلبات المعلقة'</span>, <span class="cls">Order</span>::<span class="fn">pending</span>()-><span class="fn">count</span>())
                -><span class="fn">color</span>(<span class="str">'danger'</span>),
        ];
    }
}</pre></div>` },
        { title:'Custom Actions وـ Modals', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">PostResource.php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Filament\\Tables\\Actions\\Action</span>;

<span class="cm">// Action بـ Modal Form</span>
<span class="cls">Action</span>::<span class="fn">make</span>(<span class="str">'approve'</span>)
    -><span class="fn">label</span>(<span class="str">'موافقة'</span>)
    -><span class="fn">icon</span>(<span class="str">'heroicon-o-check-circle'</span>)
    -><span class="fn">color</span>(<span class="str">'success'</span>)
    -><span class="fn">requiresConfirmation</span>()
    -><span class="fn">form</span>([
        <span class="cls">Textarea</span>::<span class="fn">make</span>(<span class="str">'note'</span>)-><span class="fn">label</span>(<span class="str">'ملاحظة الموافقة'</span>)-><span class="fn">required</span>(),
        <span class="cls">DatePicker</span>::<span class="fn">make</span>(<span class="str">'publish_date'</span>)-><span class="fn">label</span>(<span class="str">'تاريخ النشر'</span>),
    ])
    -><span class="fn">action</span>(<span class="kw">function</span>(<span class="cls">Post</span> <span class="var">$record</span>, <span class="kw">array</span> <span class="var">$data</span>): <span class="kw">void</span> {
        <span class="var">$record</span>-><span class="fn">update</span>([
            <span class="str">'status'</span>       => <span class="str">'approved'</span>,
            <span class="str">'note'</span>         => <span class="var">$data</span>[<span class="str">'note'</span>],
            <span class="str">'published_at'</span> => <span class="var">$data</span>[<span class="str">'publish_date'</span>],
        ]);
        <span class="cls">Notification</span>::<span class="fn">make</span>()-><span class="fn">success</span>()-><span class="fn">title</span>(<span class="str">'تم الموافقة'</span>)-><span class="fn">send</span>();
    }),

<span class="cm">// Bulk Action</span>
<span class="cls">BulkAction</span>::<span class="fn">make</span>(<span class="str">'publish'</span>)
    -><span class="fn">label</span>(<span class="str">'نشر المحدد'</span>)
    -><span class="fn">action</span>(<span class="kw">fn</span>(<span class="cls">Collection</span> <span class="var">$records</span>) => <span class="var">$records</span>-><span class="fn">each</span>-><span class="fn">publish</span>())
    -><span class="fn">requiresConfirmation</span>(),</pre></div>` },
        { title:'Multi-Panel Setup', content:`<p class="tut-p">Filament v3 بيدعم أكثر من Panel في نفس التطبيق — مثلاً Admin Panel وـ Customer Panel.</p><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan filament:install --panels
<span class="cm"># أدخل "customer" كاسم للـ Panel الجديد</span></pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">app/Providers/Filament/CustomerPanelProvider.php</span></div><pre class="code"><span class="kw">public function</span> <span class="fn">panel</span>(<span class="cls">Panel</span> <span class="var">$panel</span>): <span class="cls">Panel</span>
{
    <span class="kw">return</span> <span class="var">$panel</span>
        -><span class="fn">id</span>(<span class="str">'customer'</span>)
        -><span class="fn">path</span>(<span class="str">'customer'</span>)
        -><span class="fn">login</span>()
        -><span class="fn">colors</span>([<span class="str">'primary'</span> => <span class="cls">Color</span>::Blue])
        -><span class="fn">discoverResources</span>(in: <span class="fn">app_path</span>(<span class="str">'Filament/Customer'</span>), for: <span class="str">'App\\Filament\\Customer'</span>)
        -><span class="fn">authGuard</span>(<span class="str">'customer'</span>);
}</pre></div>` },
        { title:'Relationships — إدارة العلاقات', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">PostResource.php</span></div><pre class="code"><span class="cm">// HasMany — تعديل التعليقات من داخل المنشور</span>
<span class="kw">public static function</span> <span class="fn">getRelations</span>(): <span class="kw">array</span>
{
    <span class="kw">return</span> [
        <span class="cls">CommentsRelationManager</span>::<span class="kw">class</span>,
        <span class="cls">TagsRelationManager</span>::<span class="kw">class</span>,
    ];
}

<span class="cm">// في CommentsRelationManager</span>
<span class="kw">class</span> <span class="cls">CommentsRelationManager</span> <span class="kw">extends</span> <span class="cls">RelationManager</span>
{
    <span class="kw">protected static string</span> <span class="var">$relationship</span> = <span class="str">'comments'</span>;

    <span class="kw">public function</span> <span class="fn">table</span>(<span class="cls">Table</span> <span class="var">$table</span>): <span class="cls">Table</span>
    {
        <span class="kw">return</span> <span class="var">$table</span>-><span class="fn">columns</span>([
            <span class="cls">TextColumn</span>::<span class="fn">make</span>(<span class="str">'body'</span>)-><span class="fn">limit</span>(<span class="num">50</span>),
            <span class="cls">TextColumn</span>::<span class="fn">make</span>(<span class="str">'user.name'</span>)-><span class="fn">label</span>(<span class="str">'الكاتب'</span>),
        ]);
    }
}</pre></div>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Filament وعلى إيه هو مبني؟', a:`<p>Filament هو Admin Panel مبني على TALL Stack:</p><ul><li><strong>T</strong>ailwind CSS</li><li><strong>A</strong>lpine.js</li><li><strong>L</strong>aravel</li><li><strong>L</strong>ivewire</li></ul><p>بيوفر Resources، Forms، Tables، Widgets بكود minimal. في الإصدار v3 أصبح modular — تقدر تستخدمه كـ standalone components.</p>` },
      { level:'easy', q:'إيه أنواع الـ Resources في Filament وإيه الفرق بينهم؟', a:`<ul><li><strong>Resource</strong> — CRUD كامل لـ Model (الأساسي)</li><li><strong>Simple Resource</strong> — CRUD بـ Modal بدون صفحات منفصلة</li><li><strong>Custom Page</strong> — صفحة حرة بدون Model</li></ul><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan make:filament-resource Post --simple
php artisan make:filament-page Settings</pre></div>` },
      { level:'medium', q:'إزاي بتعمل Custom Action مع Modal Form في Filament؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cls">Action</span>::<span class="fn">make</span>(<span class="str">'approve'</span>)
    -><span class="fn">form</span>([
        <span class="cls">Textarea</span>::<span class="fn">make</span>(<span class="str">'note'</span>)-><span class="fn">required</span>(),
    ])
    -><span class="fn">action</span>(<span class="kw">function</span>(<span class="cls">Post</span> <span class="var">$record</span>, <span class="kw">array</span> <span class="var">$data</span>) {
        <span class="var">$record</span>-><span class="fn">update</span>([<span class="str">'status'</span> => <span class="str">'approved'</span>, <span class="str">'note'</span> => <span class="var">$data</span>[<span class="str">'note'</span>]]);
        <span class="cls">Notification</span>::<span class="fn">make</span>()-><span class="fn">success</span>()-><span class="fn">title</span>(<span class="str">'تمت الموافقة'</span>)-><span class="fn">send</span>();
    });</pre></div>` },
      { level:'medium', q:'إزاي بتعمل Authorization في Filament؟', a:`<p>Filament بيتعامل مع Laravel Policies تلقائياً:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">PostPolicy.php</span></div><pre class="code"><span class="kw">public function</span> <span class="fn">viewAny</span>(<span class="cls">User</span> <span class="var">$user</span>): <span class="kw">bool</span>
{
    <span class="kw">return</span> <span class="var">$user</span>-><span class="fn">hasRole</span>(<span class="str">'admin'</span>);
}
<span class="kw">public function</span> <span class="fn">create</span>(<span class="cls">User</span> <span class="var">$user</span>): <span class="kw">bool</span>
{
    <span class="kw">return</span> <span class="var">$user</span>-><span class="fn">can</span>(<span class="str">'create-posts'</span>);
}</pre></div><p>لو الـ Policy موجودة، Filament هيخفي الـ Buttons والـ Actions تلقائياً.</p>` },
      { level:'medium', q:'إزاي بتعمل Global Search في Filament؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">PostResource.php</span></div><pre class="code"><span class="kw">protected static bool</span> <span class="var">$globallySearchable</span> = <span class="kw">true</span>;

<span class="kw">public static function</span> <span class="fn">getGlobalSearchResultTitle</span>(<span class="cls">Model</span> <span class="var">$record</span>): <span class="kw">string</span>
{
    <span class="kw">return</span> <span class="var">$record</span>->title;
}

<span class="kw">public static function</span> <span class="fn">getGloballySearchableAttributes</span>(): <span class="kw">array</span>
{
    <span class="kw">return</span> [<span class="str">'title'</span>, <span class="str">'content'</span>];
}</pre></div><p>اضغط <code>CTRL + K</code> في الـ Panel لتفعيل البحث الشامل.</p>` },
      { level:'hard', q:'إزاي بتعمل Multi-Panel في Filament v3؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan filament:install --panels
<span class="cm"># ادخل اسم "customer" للـ Panel الثاني</span></pre></div><p>كل Panel عنده:</p><ul><li>Resources وـ Pages وـ Widgets منفصلة تماماً</li><li>ألوان وـ Path وـ Domain منفصل</li><li>Authentication Guard منفصل</li><li>Middleware منفصل</li></ul><div class="alert alert-info"><div class="alert-icon">💡</div><div>استخدم <code>->authGuard('customer')</code> عشان كل Panel يعمل بـ User Model مختلف.</div></div>` },
      { level:'hard', q:'إزاي بتضيف Custom Theme لـ Filament؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan make:filament-theme</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">AdminPanelProvider.php</span></div><pre class="code"><span class="var">$panel</span>
    -><span class="fn">viteTheme</span>(<span class="str">'resources/css/filament/admin/theme.css'</span>)
    -><span class="fn">colors</span>([
        <span class="str">'primary'</span> => <span class="cls">Color</span>::<span class="fn">hex</span>(<span class="str">'#00ff87'</span>),
        <span class="str">'gray'</span>    => <span class="cls">Color</span>::Slate,
    ])</pre></div>` },
    ]
  },

  // ==================== PULSE ====================
];
