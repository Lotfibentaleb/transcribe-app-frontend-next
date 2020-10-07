/*!

=========================================================
* * NextJS Material Dashboard v1.0.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Movie from "@material-ui/icons/Movie";
import Queue from "@material-ui/icons/Queue";
import Audiotrack from "@material-ui/icons/Audiotrack";
import FeaturedPlayList from "@material-ui/icons/FeaturedPlayList";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/video-upload",
    name: "Video Upload",
    icon: Movie,

    layout: "/admin",
  },
  {
    path: "/video-list",
    name: "Video List",
    icon: Queue,

    layout: "/admin",
  },
  {
    path: "/audio-upload",
    name: "Audio Upload",
    icon: Audiotrack,

    layout: "/admin",
  },
  {
    path: "/audio-list",
    name: "Audio List",
    icon: FeaturedPlayList,

    layout: "/admin",
  },
];

export default dashboardRoutes;
