// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import Knoqlogico from "../assets/images/knoq_logo.png";

// const DownloadProjectReport = ({ projectData }) => {
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // ** Add Company Logo (Replace with your logo's base64 or path) **
//     const imgData = Knoqlogico; // Use the imported logo
//     doc.addImage(imgData, "PNG", 14, 10, 20, 20);

//     // ** Header Section **
//     doc.setFont("times", "bold");
//     doc.setFontSize(22);
//     doc.setTextColor(40, 40, 40);
//     doc.text("Project Report", 105, 20, { align: "center" });

//     // ** Line Separator **
//     doc.setDrawColor(0);
//     doc.setLineWidth(0.5);
//     doc.line(14, 30, 196, 30);

//     // ** Project Details (Table) **
//     doc.setFontSize(12);
//     const projectInfo = [
//       ["Project ID", projectData?.project?.id || "N/A"],
//       ["Project Name", projectData?.project?.project_name || "N/A"],
//       ["Company Name", projectData?.project?.company_name || "N/A"],
//       ["Created By", projectData?.project?.created_by_name || "N/A"],
//       ["Status", projectData?.project?.status || "N/A"],
//       ["Deadline", projectData?.project?.deadline ? new Date(projectData.project.deadline).toLocaleDateString() : "N/A"],
//       ["Completion Rate", `${projectData?.completionRate ?? 0}%`],
//       ["Manager", projectData?.project?.manager?.name || "N/A"]
//     ];

//     autoTable(doc, {
//       startY: 35,
//       body: projectInfo,
//       theme: "grid",
//       styles: { fontSize: 11, cellPadding: 3 },
//       headStyles: { fillColor: [200, 200, 200], textColor: 0 }, // Light gray header
//     });

//     // ** Assigned Users Table **
//     if (projectData?.project?.assignedUsers?.length > 0) {
//       autoTable(doc, {
//         startY: doc.lastAutoTable.finalY + 15,
//         head: [["User ID", "Name", "Role"]],
//         body: projectData.project.assignedUsers.map(user => [user.id, user.name, user.role || "N/A"]),
//         theme: "striped",
//         styles: { fontSize: 11, cellPadding: 3 },
//         headStyles: { fillColor: [44, 62, 80], textColor: 255 }, // Dark blue header
//       });
//     } else {
//       doc.text("No assigned users", 14, doc.lastAutoTable.finalY + 15);
//     }

//     // ** Tasks Table (Without "Assigned To") **
//     if (projectData?.tasks?.length > 0) {
//       autoTable(doc, {
//         startY: doc.lastAutoTable.finalY + 15,
//         head: [["Task ID", "Title", "Status", "Priority", "Deadline"]],
//         body: projectData.tasks.map(task => [
//           task.id || "N/A",
//           task.title || "N/A",
//           task.status || "N/A",
//           task.priority || "N/A",
//           task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A",
//         ]),
//         theme: "striped",
//         styles: { fontSize: 11, cellPadding: 3 },
//         headStyles: { fillColor: [231, 76, 60], textColor: 255 }, // Red header
//       });
//     } else {
//       doc.text("No tasks available", 14, doc.lastAutoTable.finalY + 15);
//     }

//     // ** Summary Section **
//     doc.setFont("times", "bold");
//     doc.setFontSize(14);
//     doc.text("Summary", 14, doc.lastAutoTable.finalY + 20);
//     doc.setFont("times", "normal");
//     doc.setFontSize(12);
//     doc.text(`- Project Completion Rate: ${projectData?.completionRate ?? 0}%`, 14, doc.lastAutoTable.finalY + 30);
//     doc.text(`- Outstanding Tasks: ${projectData?.tasks?.filter(task => task.status !== "Done").length ?? 0}`, 14, doc.lastAutoTable.finalY + 40);

//     // ** Footer (Centered Page Numbers) **
//     const pageCount = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pageCount; i++) {
//       doc.setPage(i);
//       doc.setFontSize(10);
//       doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
//     }

//     // ** Save & Download the PDF **
//     doc.save("Project_Report.pdf");
//   };

//   return (
//     <button
//       onClick={generatePDF}
//       className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
//     >
//       Download Report as PDF
//     </button>
//   );
// };

// export default DownloadProjectReport;

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Knoqlogico from "../assets/images/knoq_logo.png";

const DownloadProjectReport = ({ projectData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10; // Initial Y position

    // ** Add Company Logo **
    const imgData = Knoqlogico; 
    doc.addImage(imgData, "PNG", 14, yPos, 40, 40);
    yPos += 30; // Move position down after image

    // ** Header Section **
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("Project Report", 105, yPos, { align: "center" });
    yPos += 10;

    // ** Line Separator **
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(14, yPos, 196, yPos);
    yPos += 5;

    // ** Project Details (Table) **
    doc.setFontSize(12);
    const projectInfo = [
      ["Project ID", projectData?.project?.id || "N/A"],
      ["Project Name", projectData?.project?.project_name || "N/A"],
      ["Company Name", projectData?.project?.company_name || "N/A"],
      ["Created By", projectData?.project?.created_by_name || "N/A"],
      ["Status", projectData?.project?.status || "N/A"],
      ["Deadline", projectData?.project?.deadline ? new Date(projectData.project.deadline).toLocaleDateString() : "N/A"],
      ["Completion Rate", `${projectData?.completionRate ?? 0}%`],
      ["Manager", projectData?.project?.manager?.name || "N/A"]
    ];

    autoTable(doc, {
      startY: yPos,
      body: projectInfo,
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 3 },
      headStyles: { fillColor: [200, 200, 200], textColor: 0 },
    });

    yPos = doc.lastAutoTable.finalY + 10; // Update Y position after table

    // ** Assigned Users Table **
    if (projectData?.project?.assignedUsers?.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [["User ID", "Name", "Role"]],
        body: projectData.project.assignedUsers.map(user => [user.id, user.name, user.role || "N/A"]),
        theme: "striped",
        styles: { fontSize: 11, cellPadding: 3 },
        headStyles: { fillColor: [44, 62, 80], textColor: 255 },
        margin: { top: 10 },
      });
      yPos = doc.lastAutoTable.finalY + 10;
    } else {
      doc.text("No assigned users", 14, yPos);
      yPos += 10;
    }

    // ** Tasks Table (Handles Multi-Page) **
    if (projectData?.tasks?.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [["Task ID", "Title", "Status", "Priority", "Deadline"]],
        body: projectData.tasks.map(task => [
          task.id || "N/A",
          task.title || "N/A",
          task.status || "N/A",
          task.priority || "N/A",
          task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A",
        ]),
        theme: "striped",
        styles: { fontSize: 11, cellPadding: 3 },
        headStyles: { fillColor: [231, 76, 60], textColor: 255 },
        margin: { top: 10 },
      });
      yPos = doc.lastAutoTable.finalY + 10;
    } else {
      doc.text("No tasks available", 14, yPos);
      yPos += 10;
    }

    // ** Summary Section **
    if (yPos > 260) doc.addPage(); // New page if near bottom
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Summary", 14, yPos);
    yPos += 10;
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(`- Project Completion Rate: ${projectData?.completionRate ?? 0}%`, 14, yPos);
    yPos += 10;
    doc.text(`- Outstanding Tasks: ${projectData?.tasks?.filter(task => task.status !== "Done").length ?? 0}`, 14, yPos);

    // ** Footer with Page Numbers (Multi-page support) **
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
    }

    // ** Save PDF **
    doc.save("Project_Report.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
    >
      Download Report as PDF
    </button>
  );
};

export default DownloadProjectReport;
