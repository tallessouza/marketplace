const CourseMarketplace = artifacts.require("CourseMarketplace")

contract("CourseMarketplace", accounts => {
    
    let _contract = null
    let contractOwner = null
    let buyer = null

    before(async () => {
        _contract =await CourseMarketplace.deployed()
        contractOwner = accounts[0]
        buyer = accounts[1]

    })

    describe("Purchase the new course", () => {

        it("should resolve into true value", () => {
            assert(false, "Value is not true")
        })
    })
})