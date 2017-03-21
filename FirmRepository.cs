
using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Linq.Expressions;

namespace mus.DataBase
{
    

    public class FirmRepository : GenericRepository<Firm>
    {
        #region privatevariables
        const string name = "name";
        const string direction = "asc";
        const string active = "active";
        const string battleCardReportingPriority = "battlecardreportingpriority";
        const string importance = "importance";
        const string competitorsIssue = "CompetitorsIssue";
        const string createdDate = "createddate";
        const string importanceName = "importance ";
        const string issueGroupName = "competitorsissue";
        const string contain = "Contains";
        const string equal = "eq";
        const string or = "Or";
        const string and = "And";
        const string restricted = "restricted";
        const string trueFlag = "true";
        const string falseFlag = "false";
        const string one = "1";
        const string Sor = "SOr";
        const string firm = "Firm";
        #endregion


      
        //private IQueryable<Firm> SortFirm(IQueryable<Firm> entity, string sort, string sortDir)
        //{
        //    const string _dir = direction;
        //    if (entity != null && !string.IsNullOrEmpty(sort))
        //    {
        //        switch (sort.ToLower())
        //        {
        //            case name:
        //                entity = sortDir.Equals(_dir, StringComparison.InvariantCultureIgnoreCase) ? entity.OrderBy(e => e.Name) : entity.OrderByDescending(e => e.Name);
        //                break;
        //            case battleCardReportingPriority:
        //                entity = sortDir.Equals(_dir, StringComparison.InvariantCultureIgnoreCase) ? entity.OrderBy(e => e.BattleCardReportingPriority) : entity.OrderByDescending(e => e.BattleCardReportingPriority);
        //                break;
        //            case active:
        //                entity = sortDir.Equals(_dir, StringComparison.InvariantCultureIgnoreCase) ? entity.OrderBy(e => e.Active) : entity.OrderByDescending(e => e.Active);
        //                break;
        //            default:
        //                entity = sortDir.Equals(_dir, StringComparison.InvariantCultureIgnoreCase) ? entity.OrderBy(e => e.ID)
        //                    : entity.OrderBy(e => e.ID);
        //                break;
        //        }
        //    }
        //    return entity;
        //}

        //private IQueryable<Firm> PagingFirm(IQueryable<Firm> entity, int pageSize, int skip)
        //{
        //    if (pageSize>0)
        //    {
        //        entity = entity.Skip(skip).Take(pageSize);
        //    }
           
        //    return entity;
        //}
        //private IQueryable<Firm>  FilterGridData(IQueryable<Firm> entity, GridFilterObejctModel filter)
        //{
        //    System.Diagnostics.Contracts.Contract.Requires(entity != null && filter != null);

        //    if (filter != null && !string.IsNullOrEmpty(filter.Value) && entity != null)
        //    {
        //        string expressonFilter = string.Empty;
        //        string _field = filter.Field;
        //        string _operator = filter.Operator;
        //        string _value = filter.Value;
        //        Func<Firm, bool> predicate = null;

        //        switch (_field)
        //        {
        //            case name:
        //                predicate = (e) => e.Name.ToLower().Contains(_value.ToLower());
        //                break;
        //            case active:
        //                predicate = (e) => e.Active.Value.ToString().Equals(_value,StringComparison.InvariantCultureIgnoreCase);
        //                break;
        //            default: break;

        //        }
        //        entity = entity.Where(predicate).AsQueryable();
        //    }

        //    return entity;
        //}

        public PagedDataViewModel<Firm> GetAllFirms(GridPropertyObejctModel gridAttrData)
        {

            PagedDataViewModel<Firm> firm = new PagedDataViewModel<Firm>();
            try
            {
                List<int> itemIds = new List<int>();
                long totalRecords = 0;
                string strIds = string.Empty;

               var _firm = CurrentContext.Firms.Where(t => t.RecordStatus == true).AsEnumerable();

                totalRecords = _firm.Count();
                if (gridAttrData != null)  //Grid Property operations Handled
                {

                    itemIds = FilterGridDataIds(gridAttrData);

                    if (itemIds.Any())
                    {
                        strIds = string.Join(Constants.Pipe, itemIds);
                        strIds += Constants.Pipe;
                    }

                    if (gridAttrData.filters.Any())
                    {
                        totalRecords = itemIds.Count;
                    }

                    _firm = CurrentContext.Firms.Where(c => itemIds.Contains(c.ID))
                            .OrderBy(t => SqlFunctions.CharIndex(Constants.Pipe + SqlFunctions.StringConvert((double)t.ID).Trim() + Constants.Pipe, strIds)).AsEnumerable();


                    //_firm = SortFirm(_firm, _sortfield, _sortDir);
                    //_firm = PagingFirm(_firm, _pageSize, _skip);
                }

                firm.Total = totalRecords;
                firm.Data = _firm;
            }
            catch (OptimisticConcurrencyException ex)
            {
                EventLogger.LogEvent(ex);
            }
            catch (Exception ex)
            {
                EventLogger.LogEvent(ex);
                throw;
            }
            return firm;
        }

        public bool IsDuplicate(int id, string name)
        {
            bool flag = false;
            try
            {
                return CurrentContext.Firms.Any(f => f.ID != id && f.Name.Equals(name)&&f.RecordStatus==true);
                var anyThemeFirms = CurrentContext.ThemeFirm.Any(t => t.FirmId == id && t.RecordStatus == true);
                var anyEvidenceFirms = CurrentContext.EvidenceFirm.Any(t => t.EvidenceId == id && t.RecordStatus == true);
                flag = flag || anyEvidenceFirms || anyThemeFirms;
            }
            catch (Exception ex)
            { 
            }
            return true;
        }

        public bool IsRelationExists(int id)
        {
            bool flag = false;
            try
            {
                var anyThemeFirms = CurrentContext.ThemeFirm.Any(t => t.FirmId == id && t.RecordStatus == true && t.Active==true);
                var anyEvidenceFirms = CurrentContext.EvidenceFirm.Any(t => t.FirmId == id && t.RecordStatus == true && t.Active == true);
                flag = anyEvidenceFirms;
            }
            catch (OptimisticConcurrencyException ex)
            {
                EventLogger.LogEvent(ex);
            }
            catch (Exception ex)
            {
                EventLogger.LogEvent(ex);
            }
            return flag;
        }

        private List<int> FilterGridDataIds(GridPropertyObejctModel gridPropertyData)
        {
            List<GridFilterObejctModel> andFilters = new List<GridFilterObejctModel>();
            LOVsGeneralGridParameters filterParam = new LOVsGeneralGridParameters();
            List<GridFilterObejctModel> orFilters = new List<GridFilterObejctModel>();
            List<GridFilterObejctModel> filters = new List<GridFilterObejctModel>();
            List<int> itemResultIds = new List<int>();
            List<int> itemResultLovIds = new List<int>();
            string sqlQueryBody = string.Empty;
            string sortDir = direction;
            string sortfield = name;
            int pageSize = 20;
            int skip = 0;
            string searchWord = string.Empty;
            try { 
            if (gridPropertyData != null)  //Grid Property operations Handled
            {
                sortDir = string.IsNullOrEmpty(gridPropertyData.sortDir) ? direction : gridPropertyData.sortDir;
                sortfield = string.IsNullOrEmpty(gridPropertyData.sortfield) ? name : gridPropertyData.sortfield;
                skip = gridPropertyData.skip.HasValue ? gridPropertyData.skip.Value : 0;
                pageSize = gridPropertyData.pageSize.HasValue ? gridPropertyData.pageSize.Value : 0;
                filters = gridPropertyData.filters;
                searchWord = gridPropertyData.SearchWord;

                var sample = filters.GroupBy(f => f.Operator);

                foreach (var subFilter in sample)
                {
                    if (subFilter.Key == and)
                    {
                        andFilters = subFilter.ToList();
                    }
                    if (subFilter.Key == or)
                    {
                        orFilters = subFilter.ToList();
                    }
                }

                foreach (GridFilterObejctModel item in andFilters)
                {
                    bool isAnd = false;

                    isAnd = item.Operator == and ? true : false;
                    if (isAnd)
                    {
                        switch (item.Field.ToLower())
                        {
                            case name:
                                sqlQueryBody += " AND LOWER(A.Name) LIKE '%" + item.Value.Trim().ToLower() + "%'";
                                break;

                            default:
                                    sqlQueryBody = string.Empty;
                                    break;
                        }
                    }

                }
            }

           

            GridOperationRepository<int> repo = new GridOperationRepository<int>();
            searchWord = GetCommonSearchQuery(searchWord);

            if (orFilters.Any())
            {
                gridPropertyData.filters = orFilters;
            }

            gridPropertyData.sortDir = sortDir;
            gridPropertyData.sortfield = sortfield;
            gridPropertyData.skip = skip;
            gridPropertyData.pageSize = pageSize;

                filterParam.TableName = "Firm";
                filterParam.sqlQueryString = sqlQueryBody;
                filterParam.PageSize = (int)gridPropertyData.pageSize;
                filterParam.SortField = gridPropertyData.sortfield;
                filterParam.SortDirection = gridPropertyData.sortDir;
                filterParam.Skip = (int)gridPropertyData.skip;

              // itemResultIds = repo.LOVFilterTableContent(gridPropertyData, firm, sqlQueryBody, searchWord).ToList();
                //SetSortFieldParameter(filterParam);
                itemResultLovIds = repo.LOVsGridTableContentIds(filterParam).ToList();
            }
            catch (OptimisticConcurrencyException ex)
            {
                EventLogger.LogEvent(ex);
            }
            catch (Exception ex)
            {
                EventLogger.LogEvent(ex);
                throw;
            }

            return itemResultLovIds;
        }

        private LOVsGeneralGridParameters SetSortFieldParameter(LOVsGeneralGridParameters filterParam)
        {
            if (!string.IsNullOrEmpty(filterParam.SortField))
            {
                switch (filterParam.SortField.ToLower())
                {
                    case name:
                        filterParam.SortField = name;
                        break;
                    default:
                        filterParam.SortField = string.Empty;
                        break;
                }
            }

            return filterParam;
        }
        string GetCommonSearchQuery(string searchWord)
        {
            try { 
            if (string.IsNullOrEmpty(searchWord))
            {
                searchWord = string.Empty;

            }
            else
            {
                searchWord = searchWord.Trim().ToLower().Replace("'", "''");
                string name = string.Format("LOWER(Headline) LIKE '%{0}%'", searchWord);
                DateTime dtEvidence;
                searchWord = string.Format("AND ( {0} )", name);

            }
            }
            catch (OptimisticConcurrencyException ex)
            {
                EventLogger.LogEvent(ex);
            }
            catch (Exception ex)
            {
                EventLogger.LogEvent(ex);
                throw;
            }

            return searchWord;
        }
    }
}
