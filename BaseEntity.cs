using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace KPMG.CI.CompetitiveIntelligence.Model
{
    public class BaseEntity
    {
        [JsonIgnore]
        [StringLength(100)]
        public string CreatedBy { get; set; }
        [JsonIgnore]
        public DateTime? CreatedDate { get; set; }
        [JsonIgnore]
        [StringLength(100)]
        public string ModifiedBy { get; set; }
        [JsonIgnore]
        public DateTime? ModifiedDate { get; set; }
        [JsonIgnore]
        public bool? RecordStatus { get; set; }
        public bool? Active { get; set; }


        public BaseEntity()
        {
            CreatedDate = DateTime.Now;
            ModifiedDate = DateTime.Now;
            RecordStatus = true;
            Active = true;
        }

    }

}

