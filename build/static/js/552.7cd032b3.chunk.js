"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[552],{552:(e,t,s)=>{s.r(t),s.d(t,{default:()=>u});var a=s(43),r=s(121),l=s(825),i=s(631),n=s(664),c=s(280),o=s(910),d=s(399),x=s(579);const u=function(e){let{post:t}=e;const[s,u]=(0,a.useState)(!1),[h,g]=(0,a.useState)(!1),[m,p]=(0,a.useState)(0),[y,j]=(0,a.useState)(0),[f,k]=(0,a.useState)(!1),b=()=>{k(!f)};(0,a.useEffect)((()=>{(0,c.d3)(t._id).then((e=>{p(e.commentCount),j(e.likeCount)})).catch((e=>{console.log(e)}))}),[]);const v=()=>{u(!s)},w=(0,r.GP)(new Date(t.date),"MMMM dd, yyyy"),[N,C]=(0,a.useState)(!1),[M,S]=(0,a.useState)(!1),z=()=>{S(!M)},_=()=>{g(!h)};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{children:[f&&(0,x.jsx)(o.A,{isOpen:f,toggleModal:b,postId:t._id}),h&&(0,x.jsx)(i.A,{isOpen:h,onClose:_,post:t}),(0,x.jsx)("img",{className:"object-cover object-center w-full h-64 rounded-lg lg:h-80",src:t.image,alt:""}),(0,x.jsxs)("div",{className:"mt-8",children:[(0,x.jsx)("span",{className:"text-blue-500 uppercase",children:t.userId.userName}),(0,x.jsx)("h1",{className:"mt-4 text-xl font-semibold text-gray-800 dark:text-white",children:t.title}),(0,x.jsx)("p",{className:"mt-2 text-gray-500 dark:text-gray-400",children:t.description}),(0,x.jsxs)("div",{className:"flex items-center justify-between mt-4",children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("a",{href:"#",className:"text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500",children:t.userId.userName}),(0,x.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:w})]}),(0,x.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,x.jsxs)("div",{className:"relative flex items-center space-x-1",children:[(0,x.jsx)(l.Sxb,{onClick:()=>b(t._id),className:"h-6 w-6 text-gray-400 cursor-pointer"}),(0,x.jsx)("span",{className:"text-gray-400",children:y}),(0,x.jsx)("div",{onClick:_,children:(0,x.jsx)(l.awm,{className:"h-6 w-6 text-gray-400 cursor-pointer"})}),(0,x.jsx)("span",{className:"text-gray-400",children:m})]}),(0,x.jsx)("div",{className:"relative",children:(0,x.jsxs)("div",{className:"relative inline-block",children:[(0,x.jsx)("button",{onClick:()=>{C(!N)},className:"relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none",children:(0,x.jsx)("svg",{className:"w-5 h-5 text-gray-800 dark:text-white",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:(0,x.jsx)("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})}),N&&(0,x.jsx)("div",{onClick:()=>C(!1),className:"fixed inset-0 z-10 w-full h-full"}),(0,x.jsxs)("div",{className:"absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 ".concat(N?"block":"hidden"),onMouseEnter:()=>C(!0),onMouseLeave:()=>C(!1),children:[(0,x.jsx)("button",{onClick:v,className:"block w-full px-4 py-3 text-sm text-gray-600 capitalize transition-colors text-left duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white",children:"Edit"}),(0,x.jsx)("button",{onClick:z,className:"block w-full px-4 py-3 text-sm text-red-600 capitalize transition-colors text-left duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white",children:"Delete"})]})]})})]})]})]})]}),M&&(0,x.jsx)(d.A,{isOpen:M,onClose:z,postId:t._id}),s&&(0,x.jsx)(n.A,{isOpen:s,onClose:v,post:t})]})}}}]);
//# sourceMappingURL=552.7cd032b3.chunk.js.map