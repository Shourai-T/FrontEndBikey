function editAccount (){
    return (
        <div>
            <h2>Chỉnh sửa thông tin</h2>
            <div className="flex flex-col w-full">
                <div className="flex w-full">
                    <p className="w-full">Họ và tên</p>
                    <input type="text" className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-300" placeholder="Nguyễn Ngọc Quỳnh Như"/>
                </div>
            </div>
        </div>
    )
}

export default editAccount;