import XCTest
@testable import Thor

class ThorTests: XCTestCase {
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.

        Thor.sharedInstance.augmentedDictionary["key"] = "Test"

        XCTAssertEqual((Thor.sharedInstance.augmentedDictionary["key"] as! String), "Test")
    }


    static var allTests = [
        ("testExample", testExample),
    ]
}
