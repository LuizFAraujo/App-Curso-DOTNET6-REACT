
var builder = WebApplication.CreateBuilder(args);


// -------------------------------
//Contexto criado:
builder.Services.AddDbContext<DataContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// -------------------------------
// Toda vez que "alguém" precisar de um "IAtividadeRepo",
// passa para esse "alguém" o "AtividadeRepo".
builder.Services.AddScoped<IAtividadeRepo, AtividadeRepo>();

// similar ...
builder.Services.AddScoped<IGeralRepo, GeralRepo>();
builder.Services.AddScoped<IAtividadeService, AtividadeService>();

// -------------------------------

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(op =>
    {
        // para exibir textos dos enums
        op.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });


// ===================================
// ===================================



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// ===================================
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProAtividade.API", Version = "v1" });
});

// -------------------------------
//Cors - permite que o frontend acesse o backend
builder.Services.AddCors();
// ===================================


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProAtividade.API v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();


// -------------------------------
//Cors - configuração
app.UseCors(option => option.AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin());


app.MapControllers();

app.Run();



