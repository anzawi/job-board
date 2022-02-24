using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Middleware;
using API.Services;
using Application.Applications;
using Application.Core;
using Application.Jobs;
using Application.Services;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Persistence;
using List = Application.Jobs.List;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<Application.Jobs.Create>();
                config.RegisterValidatorsFromAssemblyContaining<Application.Applications.Create>();
            }).AddNewtonsoftJson(options=>
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            
            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" }); });

            // add our cors origin policies
            services.AddCors(options =>
            {
                options.AddPolicy("polisies",
                    policy => { policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"); });
            });
            
            // add Sqlite service and connection
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            // add mediator service
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddMediatR(typeof(UserList.Handler).Assembly);
            // add models auto mapping on properties service
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            // add authentication and authorization services
            services.AddIdentityCore<AppUser>(options => { options.Password.RequireNonAlphanumeric = false; })
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<AppUser>>();
            
            // configure authentication
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("TokenKey")));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            // add token generator service
            services.AddScoped<TokenService>();
            // add user accessor service
            services.AddScoped<IUserAccessor, UserAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("polisies");
            // custom Exception handler 
            app.UseMiddleware<ExceptionMiddleware>();
            if (env.IsDevelopment())
            {
                // I dont need this Exception handler , I create owen one!
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            // I dont want to redirect to [https]
            /*app.UseHttpsRedirection();*/

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}