import { Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import WorkItems from "./work-items/WorkItems";

const recordsBreadCrumbs: Array<PageLink> = [
    {
      title: 'Records',
      path: '/apps/work-records/work-items',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

const WorkItemsRecord = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route path="work-items" element={
                    <>
                    <PageTitle breadcrumbs={recordsBreadCrumbs}>Work items</PageTitle>
                    <WorkItems className={""} />
                    </>
                }/>
            </Route>
        </Routes>
    )
};

export default WorkItemsRecord;