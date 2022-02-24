using AutoMapper;
using Domain;

namespace Application.Core
{
    /// <summary>
    /// auto mapping 
    /// </summary>
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // we need a map for job editing
            // maybe I'll not handle a job editing in front-end
            // but its ready in api
            CreateMap<Job, Job>();
        }
    }
}