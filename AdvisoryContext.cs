
using System.Configuration;
using System.Data.Entity;

namespace mus.DataBase
{
    public class AdvisoryContext : DbContext
    {
        const string connectionString = "name=AdvisoryConnection";
        public AdvisoryContext()
                : base(connectionString)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = true;
            int cmdTimeout = -1;
            string timeoutSettings = ConfigurationManager.AppSettings["ContextCommandTimeout"];

            if (!string.IsNullOrEmpty(timeoutSettings))
            {
                int.TryParse(timeoutSettings, out cmdTimeout);
            }

            if (cmdTimeout >= 0)
            { this.Database.CommandTimeout = cmdTimeout; }
        }

        public virtual DbSet<CompetitorsIssue> CompetitorsIssues { get; set; }
        public virtual DbSet<ThemeType> ThemeTypes { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Evidence> Evidences { get; set; }
        public virtual DbSet<Firm> Firms { get; set; }
        public virtual DbSet<Geography> Geographies { get; set; }
        //  public virtual DbSet<GSPA> GSPAs { get; set; }
        public virtual DbSet<Importance> Importances { get; set; }
        public virtual DbSet<IssueGroup> IssueGroups { get; set; }
        public virtual DbSet<IssueCategory> IssueCategories { get; set; }
        public virtual DbSet<IssueHeader> IssueHeaders { get; set; }
        public virtual DbSet<Sector> Sectors { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<SourceOfInsight> SourceOfInsights { get; set; }
        public virtual DbSet<StrategicIssue> StrategicIssues { get; set; }
        public virtual DbSet<SWOT> SWOTs { get; set; }
        public virtual DbSet<Theme> Themes { get; set; }

        public virtual DbSet<Source> Sources { get; set; }
        public virtual DbSet<PNB> PNBs { get; set; }
        public virtual DbSet<GlobalClient> GlobalClient { get; set; }
        public virtual DbSet<LocalGeography> LocalGeography { get; set; }
        public DbSet<ImportedEvidence> ImportedEvidence { get; set; }

        public DbSet<ImportedTheme> ImportedTheme { get; set; }
        public virtual DbSet<EvidenceCompetitorIssue> EvidenceCompetitorIssue { get; set; }
        public virtual DbSet<EvidenceFirm> EvidenceFirm { get; set; }
        public virtual DbSet<EvidenceGeographicRelevance> EvidenceGeographicRelevance { get; set; }
        public virtual DbSet<EvidenceGlobalClient> EvidenceGlobalClient { get; set; }

        public virtual DbSet<EvidenceLocalGeography> EvidenceLocalGeography { get; set; }
        public virtual DbSet<EvidenceSector> EvidenceSector { get; set; }
        public virtual DbSet<EvidenceService> EvidenceService { get; set; }
        public virtual DbSet<EvidenceStrategicIssue> EvidenceStrategicIssue { get; set; }
        public virtual DbSet<EvidenceTheme> EvidenceTheme { get; set; }

        public virtual DbSet<ThemeCompetitorIssue> ThemeCompetitorIssue { get; set; }
        public virtual DbSet<ThemeFirm> ThemeFirm { get; set; }
        public virtual DbSet<ThemeGeographicRelevance> ThemeGeographicRelevance { get; set; }
        public virtual DbSet<ThemeRelatedTheme> ThemeRelatedTheme { get; set; }
        public virtual DbSet<ThemeSector> ThemeSector { get; set; }
        public virtual DbSet<ThemeService> ThemeService { get; set; }
        public virtual DbSet<ThemeStrategicIssue> ThemeStrategicIssue { get; set; }
        public virtual DbSet<ThemeGlobalClient> ThemeGlobalClient { get; set; }
        public virtual DbSet<ThemeLocalGeography> ThemeLocalGeography { get; set; }
        public virtual DbSet<User> Users { get; set; }


        /*------BATTLECARD----------*/
        public virtual DbSet<ExtraPage> ExtraPages { get; set; }
        public virtual DbSet<ImagePage> ImagePages { get; set; }
        public virtual DbSet<Report> Reports { get; set; }

        public virtual DbSet<ReportTheme> ReportThemes { get; set; }
        public virtual DbSet<ReportType> ReportTypes { get; set; }
        public virtual DbSet<Thumbnail> Thumbnails { get; set; }
        public virtual DbSet<ReportThemeIssueGroup> ReportThemeIssueGroups { get; set; }
        public virtual DbSet<ReportEvidence> ReportEvidences { get; set; }

        public virtual DbSet<TemporaryFile> TemporaryFiles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
            {
                return;
            }

            modelBuilder.Entity<CompetitorsIssue>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<CompetitorsIssue>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);



            modelBuilder.Entity<ThemeType>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<ThemeType>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Evidence>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Evidence>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Firm>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Firm>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Geography>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Geography>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            //modelBuilder.Entity<GlobalClient>()
            //    .Property(e => e.CreatedBy)
            //    .IsUnicode(false);

            //modelBuilder.Entity<GlobalClient>()
            //    .Property(e => e.ModifiedBy)
            //    .IsUnicode(false);

            modelBuilder.Entity<Firm>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Firm>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);



            modelBuilder.Entity<Importance>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Importance>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<IssueGroup>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<IssueGroup>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<IssueHeader>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<IssueHeader>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Sector>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Sector>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Service>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Service>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Service>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<SourceOfInsight>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<SourceOfInsight>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<StrategicIssue>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<StrategicIssue>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<SWOT>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<SWOT>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<SWOT>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Theme>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Theme>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);
            modelBuilder.Entity<ExtraPage>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<ExtraPage>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<ImagePage>()
                .Property(e => e.RelatedPage)
                .IsUnicode(false);

            modelBuilder.Entity<ImagePage>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<ImagePage>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Report>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Report>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Report>()
                .HasMany(e => e.ExtraPages)
                .WithRequired(e => e.Report)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Report>()
                .HasMany(e => e.ImagePages)
                .WithRequired(e => e.Report)
                .WillCascadeOnDelete(false);



            modelBuilder.Entity<Report>()
                .HasMany(e => e.ReportThemes)
                .WithRequired(e => e.Report)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Report>()
                .HasMany(e => e.Thumbnails)
                .WithRequired(e => e.Report)
                .WillCascadeOnDelete(false);



            modelBuilder.Entity<ReportTheme>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<ReportTheme>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<ReportType>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<ReportType>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<ReportType>()
                .HasMany(e => e.Reports)
                .WithRequired(e => e.ReportType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Thumbnail>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Thumbnail>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
               .Property(e => e.CreatedBy)
               .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<TemporaryFile>()
               .Property(e => e.CreatedBy)
               .IsUnicode(false);

            modelBuilder.Entity<TemporaryFile>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);
        }
    }
}