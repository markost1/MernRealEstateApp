

export default function Pagination({currentPage,totalPages,onPageChange}) {
    if (totalPages <= 1) return null;

    const pages = Array.from({length:totalPages}, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
        <button onClick={()=>{onPageChange(currentPage - 1)}}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded bg-gray-100 disabled:opacity-90"
        >
        «
        </button>

        {pages.map((page)=> (
            <button 
            key={page}
            onClick={()=>{ onPageChange(page)}}
            className={`px-3 py-1 border rounded ${
            currentPage === page 
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"
            }`}
            >
                {page}
            </button>
        ))}


        <button 
        onClick={()=> onPageChange(currentPage+1)}
        disabled = {currentPage === totalPages}
        className="px-3 py-1 border rounded bg-gray-100 disabled:opacity-90">

        »

        </button>


    </div>
  );
}
