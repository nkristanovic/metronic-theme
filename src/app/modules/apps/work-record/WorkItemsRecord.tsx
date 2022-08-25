import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import WorkItems from "./work-items/WorkItems";

const recordsBreadCrumbs: Array<PageLink> = [
    {
      title: 'Administracija-Postavke sustava',
      path: '/apps/work-records/work-items',
      isSeparator: false,
      isActive: true,
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
                    <PageTitle breadcrumbs={recordsBreadCrumbs}>Korisnici</PageTitle>
                    <WorkItems className={""} />
                    </>
                }/>
            </Route>
        </Routes>
    )
};

export default WorkItemsRecord;